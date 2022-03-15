import { useMutation, UseMutationResult } from 'react-query';
import { http } from '../../services';
import { ISignupForm } from '../../types/api/auth';

export function useSignUp(): UseMutationResult<{ id: number }, unknown, ISignupForm> {
  const signUpQuery = (payload: ISignupForm): Promise<{ id: number }> => http.post(`/auth/signup`, payload);
  return useMutation(signUpQuery);
}
