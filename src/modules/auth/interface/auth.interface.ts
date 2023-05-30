import { IUserEntity } from "src/modules/user/interface/user.interface";

export interface IAuth {
    email: string;
    password: string;
}

export interface IAuthTokenUser {
    access_token: string;
    user: IUserEntity
}