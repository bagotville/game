import AuthAPI from '../api/auth/auth'

import { ISignupForm, IUserData } from '../api/auth/auth.types';
import { useAppDispatch } from '../store/store.hooks';
import { error, fetchUser, signOut } from '../pages/auth/auth.reducer';

export interface authState {
    isSignedIn: boolean;
    user: IUserData | undefined;
    error: string;
}

class AuthController {
    private api;

    private dispatch;

    constructor() {
        this.api = AuthAPI;
        this.dispatch = useAppDispatch();
    }

    private async getUser(): Promise<authState> {

        const result: authState = await this.api.getUserData()
            .then(user => ({
                error: '',
                isSignedIn: true,
                user
            }))
            .catch(exception => ({
                error: exception.reason,
                isSignedIn: false,
                user: undefined
            }));
        return result;
    }

    async fetchUser() {
        const newState = await this.getUser();
        if (!newState.error && newState.user) {
            this.dispatch(fetchUser(newState.user));
        } else {
            this.dispatch(error(newState.error))
        }
    }

    async signUp(user: ISignupForm) {
        await this.api.signup(user)
            .then(() => {
                this.fetchUser();
            })
            .catch((exception) => {
                if (exception === 'User already in system') {
                    this.fetchUser();
                } else {
                    this.dispatch(error(exception))
                }
            });
    }

    async signIn(login: string, password: string) {
        await this.api.signin({ login, password })
            .then(() => {
                this.fetchUser();
            })
            .catch((exception) => {
                this.dispatch(error(exception.reason))
            });
    }

    async logout() {
        await this.api.logout()
            .then(() => {
                this.dispatch(signOut());
            })
            .catch(exception => {
                this.dispatch(error(exception));
            });
    }
}

const authController = new AuthController();
export default authController;
