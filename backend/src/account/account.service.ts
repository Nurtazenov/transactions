import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { GetUsersByFiltersParam, GetUsersResponse, VerificationParams } from 'src/types/account.types';
@Injectable()
export class AccountService {
    constructor(
        private readonly config:ConfigService,
        private readonly httpServise: HttpService
    ){}

    async verification(
        params: VerificationParams
    ): Promise<boolean> {
        const url = `${this.config.get('ACCOUNT_URL')}/v1/user/verification`;
        const res = await this.httpServise.axiosRef.get(url, {params});

        return res.data
    }
    async GetUsersByFilter (
        params:GetUsersByFiltersParam,
    ): Promise<GetUsersResponse> {
        const url = `${this.config.get('ACCOUNT_URL')}/v1/user`;
        const res = await this.httpServise.axiosRef.get(url, {params});
        return res.data
    }
}
