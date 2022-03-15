import { useMutation, UseMutationResult } from 'react-query';
import { http } from '../../services';
import { ISigninForm } from '../../types/api/auth';

export function useSignIn(): UseMutationResult<'OK', unknown, ISigninForm> {
  const signInQuery = (payload: ISigninForm): Promise<'OK'> => http.post(`/auth/signin`, payload);
  return useMutation(signInQuery);
}
