import { useQuery, UseQueryResult } from 'react-query';
import { http } from '../../services';
import { ISigninForm } from '../../types/api/auth';

export function useSignIn(payload: ISigninForm): UseQueryResult<'OK'> {
  const signInQuery = (): Promise<'OK'> => http.post(`/auth/signin`, payload);
  return useQuery('signInQuery', signInQuery, {
    staleTime: Infinity,
    retry: 0,
    refetchOnWindowFocus: false,
  });
}
