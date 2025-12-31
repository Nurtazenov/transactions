import { ApiProperty } from "@nestjs/swagger";
import {Expose, plainToInstance} from 'class-transformer'
import { IsString } from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserDto {
@ApiProperty({
    description: 'Индетификатор пользователя',
    required: true,
    type: String,
})
@Expose()
@IsString()
userId: string;

@ApiProperty({
    description:"Логин пользователя",
    required: true,
    type: String
})
@Expose()
@IsString()
login:string
@ApiProperty({
    description:"Пароль пользователя",
    required: true,
    type: String
})
@Expose()
@IsString()
password:string

@ApiProperty({
    description:"Телефон пользователя",
    required: true,
    type: String
})
@Expose()
@IsString()
phone:string

@ApiProperty({
    description:"Имя пользователя",
    required: true,
    type: String
})
@Expose()
@IsString()
firstName:string

@ApiProperty({
    description:"Фамилия пользователя",
    required: true,
    type: String
})
@Expose()
@IsString()
lastName:string

@ApiProperty({
    description:"Отчество пользователя",
    required: true,
    type: String
})
@Expose()
@IsString()
middleName:string

@ApiProperty({
    description:"E-mail пользователя",
    required: true,
    type: String
})
@Expose()
@IsString()
email:string

constructor(entity: Partial<User>){
    return plainToInstance(CreateUserDto, entity, {excludeExtraneousValues: true});
}
}
