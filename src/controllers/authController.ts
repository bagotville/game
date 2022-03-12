import { error, fetchUser as fetch, signOut } from '../store/reducers/auth';
import { authState } from './authController.types';
import { authApi } from '../api';
import { ISignupForm } from '../api/auth';
import { AppDispatch } from '../store/store';

function authController() {
  const api = authApi;

  const getUser = (): Promise<authState> => {
    const result: Promise<authState> = api
      .getUserData()
      .then((user) => ({
        error: '',
        isAuth: true,
        user,
      }))
      .catch((exception) => ({
        error: exception.reason,
        isAuth: false,
        user: undefined,
      }));
    return result;
  };

  const fetchUser = async (dispatch: AppDispatch) => {
    const newState = await getUser();
    if (!newState.error && newState.user) {
      dispatch(fetch(newState.user));
    } else {
      dispatch(error(newState.error));
    }
  };

  const signUp = async (user: ISignupForm, dispatch: AppDispatch) => {
    api
      .signup(user)
      .then(() => {
        fetchUser(dispatch);
      })
      .catch((exception) => {
        if (exception.response.data.reason === 'User already in system') {
          fetchUser(dispatch);
        } else {
          dispatch(error(exception));
        }
      });
  };

  const signIn = async (login: string, password: string, dispatch: AppDispatch) => {
    api
      .signin({ login, password })
      .then(() => {
        fetchUser(dispatch);
      })
      .catch((exception) => {
        if (exception.response.data.reason === 'User already in system') {
          fetchUser(dispatch);
        } else {
          dispatch(error(exception.response.data.reason));
        }
      });
  };

  const logout = async (dispatch: AppDispatch) => {
    api
      .logout()
      .then(() => {
        dispatch(signOut());
      })
      .catch((exception) => {
        dispatch(error(exception));
      });
  };

  return {
    getUser,
    fetchUser,
    signUp,
    signIn,
    logout,
  };
}

export default authController();
