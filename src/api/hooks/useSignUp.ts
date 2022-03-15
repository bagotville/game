import { useQuery, UseQueryResult } from 'react-query';
import { http } from '../../services';
import { ISignupForm } from '../../types/api/auth';

export function useSignUp(payload: ISignupForm): UseQueryResult<{ id: number }> {
  const signUpQuery = (): Promise<{ id: number }> => http.post(`/auth/signup`, payload);
  return useQuery('signUpQuery', signUpQuery, {
    staleTime: Infinity,
    retry: 0,
    refetchOnWindowFocus: false,
  });
}
