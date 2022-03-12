import { useQuery, UseQueryResult } from 'react-query';
import { http } from '../../services';
import { IUserData } from '../auth';

export function useAuthCurrent(): UseQueryResult<IUserData> {
  const authQuery = (): Promise<IUserData> => http.get('/auth/user');

  return useQuery<IUserData>('authQuery', authQuery, {
    staleTime: Infinity,
    retry: 0,
    refetchOnWindowFocus: false,
  });
}
