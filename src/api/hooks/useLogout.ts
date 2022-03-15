import { useQuery, UseQueryResult } from 'react-query';
import { http } from '../../services';

export function useLogout(): UseQueryResult<'OK'> {
  const signInQuery = (): Promise<'OK'> => http.post(`/auth/logout`);
  return useQuery('signInQuery', signInQuery, {
    staleTime: Infinity,
    retry: 0,
    refetchOnWindowFocus: false,
  });
}
