import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { DeepPartial, Repository } from "typeorm";
import { CheckExistUserParams, SearchUserParams } from "src/types/user.types";
import { SelectQueryBuilder } from "typeorm/browser";


export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}
    async createUser<T extends DeepPartial<User>>(entity:T):Promise<User>{
        return this.userRepository.save(entity);
    }

    async findById(userId:string):Promise<User | null>{
        return this.userRepository.findOneBy({ userId });
    }
    async findAndCount(params:SearchUserParams):Promise<{items:User[]; total:number}> {
        const [items, total] = await this.qb(params).getManyAndCount();
        return {items, total}
    }

    async updateUser(params: DeepPartial<User>):Promise<void> {
        await this.userRepository.update({userId:params.userId}, params)
    }

    async deleteUser(id:string): Promise<void> {
        await this.userRepository.delete({userId: id})
    }

    async checkExistUser(params:CheckExistUserParams, alias = 'user') {
        const query = this.userRepository.createQueryBuilder(alias);

        query.where('user.login = :login', {login: params.login});
        query.orWhere('user.phone = :phone', {phone:params.phone});
        const result = await query.getOne();
        return result ? true : false
}

    qb(params:SearchUserParams = {}, alias='user'):SelectQueryBuilder<User>{
        const query = this.userRepository.createQueryBuilder(alias);

        if(params?.userIds?.length){
            query.andWhere(`${alias}.userId in (:...userIds)`, {userIds: params.userIds});
        }
        if(params?.phones?.length){
            query.andWhere(`${alias}.phone in (:...phones)`, {phones: params.phones});
        }

        if(params.take){
            query.take(params.take);
        }
        if(params.skip){
            query.skip(params.skip);
        }

        return query;
    }
    async save<T extends DeepPartial<User>>(entity:T): Promise<User>{
        return this.userRepository.save(entity)
    }
    async findByLogin(login:string):Promise<User | null>{
        return this.userRepository.findOneBy({login})
    }
}

