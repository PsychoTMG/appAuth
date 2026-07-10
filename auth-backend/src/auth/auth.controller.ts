import { Controller, Post, UseGuards, Get, Body, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-dto';
import { LoginDto } from './dto/login-dto';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) { }

  @Post('register')
  async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    return await this.auth.register(res, dto)
  }

  @Post('login')
  async login(@Res({ passthrough: true }) res: Response, @Body() dto: LoginDto) {
    return await this.auth.login(res, dto);
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return await this.auth.refresh(req, res)
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    return await this.auth.logout(res)
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async findall(@Req() req: Request) {
    return req.user
  }

}