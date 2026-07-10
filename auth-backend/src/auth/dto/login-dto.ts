import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'


export class LoginDto {
   @IsString({ message: 'Имя должно быть строкой' })
   @IsNotEmpty({ message: 'Имя не должно быть пустым' })
   @Length(6, 20, { message: 'имя пользователя не должно быть меньше 6 и больше 20 символов' })
   username: string
   @IsString({ message: 'Имя должно быть строкой' })
   @IsNotEmpty({ message: 'Имя не должно быть пустым' })
   @IsEmail()
   email: string
   @IsString({ message: 'пароль должен быть строкой' })
   @IsNotEmpty({ message: 'пароль не должен быть пустым' })
   @Length(6, 20, { message: 'имя пользователя не должно быть меньше 6 и больше 20 символов' })
   password: string
}
