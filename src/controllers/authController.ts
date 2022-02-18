import AuthAPI from '../api/auth/index'

import { ISignupForm } from '../api/auth/auth.types';
import { useAppDispatch } from '../store/store.hooks';
import { error, fetchUser, signOut } from '../pages/auth/auth.reducer';
import { authState } from './authController.types';

class AuthController {
    private api = AuthAPI;

    private dispatch = useAppDispatch();

    private async getUser(): Promise<authState> {
        const result: Promise<authState> = this.api.getUserData()
            .then(user => ({
                error: '',
                isAuth: true,
                user
            }))
            .catch(exception => ({
                error: exception.reason,
                isAuth: false,
                user: undefined
            }));
        return result;
    }

    public async fetchUser() {
        const newState = await this.getUser();
        if (!newState.error && newState.user) {
            this.dispatch(fetchUser(newState.user));
        } else {
            this.dispatch(error(newState.error))
        }
    }

    public async signUp(user: ISignupForm) {
        this.api.signup(user)
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

    public async signIn(login: string, password: string) {
        this.api.signin({ login, password })
            .then(() => {
                this.fetchUser();
            })
            .catch((exception) => {
                this.dispatch(error(exception.reason))
            });
    }

    async logout() {
        this.api.logout()
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
