import { useMutation, UseMutationResult } from 'react-query';
import { ISigninForm } from '../auth';
import { http } from '../../services';

export function useSignIn(): UseMutationResult<'OK', unknown, ISigninForm> {
  const signInQuery = (payload: ISigninForm): Promise<'OK'> => http.post(`/auth/signin`, payload);
  return useMutation(signInQuery);
}
