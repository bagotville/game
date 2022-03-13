import { useMutation, UseMutationResult } from 'react-query';
import { http } from '../../services';

export function useLogout(): UseMutationResult<'OK'> {
  const signInQuery = (): Promise<'OK'> => http.post(`/auth/logout`);
  return useMutation(signInQuery);
}
