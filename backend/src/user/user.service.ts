import * as crypto from 'node:crypto';
import * as argon from 'argon2';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository){}
  
  create(createUserDto: CreateUserDto): Promise<void> {
    async create(user:CreateUserDto) {
  const salt = crypto.randomBytes(32),
  const hash = await argon.hash(user.password, {salt}),
      
    await this.userRepository.createUser({
        passwordHash: hash,
        passwordSalt: salt.toString('hex'),
        ...user,
      });
    }
  }


  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

