import { useMutation, UseMutationResult } from 'react-query';
import { http } from '../../services';
import { IChangeUserPass } from '../../types/api/user';

export function useChangeUserPass(): UseMutationResult<'OK', unknown, IChangeUserPass> {
  const changeUserPassQuery = (payload: IChangeUserPass): Promise<'OK'> => http.put(`/user/password`, payload);
  return useMutation(changeUserPassQuery);
}
