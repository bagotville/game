import { useQuery, UseQueryResult } from 'react-query';
import { http } from '../../services';
import { IUserData } from '../../types/api/auth';
import { signIn, signOut } from '../../store/reducers/auth';
import { useAppDispatch } from '../../store/store.hooks';

export function useAuthCurrent(): UseQueryResult<IUserData> {
  const authQuery = (): Promise<IUserData> => http.get('/auth/user');
  const dispatch = useAppDispatch();

  return useQuery<IUserData>('authQuery', authQuery, {
    staleTime: Infinity,
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (data) => dispatch(signIn(data)),
    onError: () => dispatch(signOut()),
  });
}
