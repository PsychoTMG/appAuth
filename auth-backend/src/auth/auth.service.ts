import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login-dto';
import { isDev } from 'src/util/is-dev.util';
import { JwtPayload } from './interface/auth.interface';
import { Response, Request } from 'express';


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prismaService: PrismaService,
        private configService: ConfigService,
    ) { }

    async register(res: Response, dto: RegisterDto) {
        const { email, password, username } = dto
        const user = await this.prismaService.user.findUnique({
            where: {
                email
            }
        })
        if (user) {
            throw new ConflictException('Пользователь уже существует')
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await this.prismaService.user.create({
            data: {
                password: hashedPassword,
                username,
                email,
            }
        })
        return this.auth(res, newUser.id)
    }

    async login(res: Response, dto: LoginDto) {
        const { email, password } = dto
        const user = await this.prismaService.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            throw new UnauthorizedException('Неверный email');
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            throw new UnauthorizedException('Неверный  пароль');
        }
        return this.auth(res, user.id)
    }

    private async auth(res: Response, id: string) {
        const { accessToken, refreshToken } = await this.generateToken(id)
        this.setCookies(res, refreshToken, new Date(Date.now() + 60 * 60 * 24 * 7))
        return accessToken
    }

    async generateToken(id: string) {
        const payload: JwtPayload = { id }
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: this.configService.getOrThrow<string>('JWT_ACCESS_TTL')
        })
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.configService.getOrThrow<string>('JWT_REFRESH_TTL')
        })
        return {
            accessToken,
            refreshToken
        }
    }

    async validate(id: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                username: true,
                email: true,
            },

        })
        if (!user) {
            throw new NotFoundException('пользователь не найден')
        }
        return user
    }

    async refresh(req: Request, res: Response) {
        const refreshToken = req.cookies['refreshToken']
        if (!refreshToken) {
            throw new UnauthorizedException('не действительный рефрешик')
        }
        const payload: JwtPayload = await this.jwtService.verifyAsync(refreshToken)
        if (payload) {
            const user = await this.prismaService.user.findUnique({
                where: {
                    id: payload.id
                },
                select: {
                    id: true
                }
            })
            if (!user) {
                throw new NotFoundException('пользователь не найден')
            }
            return this.auth(res, user.id)
        }
    }

    private setCookies(res: Response, value: string, expires: Date) {
        res.cookie('refreshToken', value, {
            httpOnly: true,
            domain: this.configService.getOrThrow('COOKIE_DOMAIN'),
            expires,
            secure: !isDev(this.configService),
            sameSite: !isDev(this.configService) ? 'none' : 'lax'
        })
    }

    async logout(res: Response) {
        this.setCookies(res, 'refreshToken', new Date(0))
    }
}

