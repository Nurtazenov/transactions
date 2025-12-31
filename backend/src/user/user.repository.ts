import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { DeepPartial, Repository } from "typeorm";


export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async save<T extends DeepPartial<User>>(entity:T): Promise<User>{
        return this.userRepository.save(entity)
    }
}

