import { IUserData } from "../api/auth/auth.types";

export interface authState {
    isAuth: boolean;
    user: IUserData | undefined;
    error: string;
}
