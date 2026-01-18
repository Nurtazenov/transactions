import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
    @ApiProperty({
        description: 'Логин',
        required: true,
        type:String
    })
    @IsNotEmpty({message:'Поле "login" должно быть заполнено'})
    @IsString({message:'Поле "login" должно быть строкой'})
    readonly login:string
    
    @ApiProperty({
        description: 'Пароль',
        required: true,
        type:String
    })
    @IsNotEmpty({message:'Поле "password" должно быть заполнено'})
    @IsString({message:'Поле "password" должно быть строкой'})
    readonly password:string
}
