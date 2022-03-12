import { useMutation, UseMutationResult } from 'react-query';
import { ISignupForm } from '../auth';
import { http } from '../../services';

export function useSignUp(): UseMutationResult<{ id: number }, unknown, ISignupForm> {
  const signUpQuery = (payload: ISignupForm): Promise<{ id: number }> => http.post(`/auth/signup`, payload);
  return useMutation(signUpQuery);
}
