import { useMutation, UseMutationResult } from 'react-query';
import { http } from '../../services';
import { IUserData } from '../../types/api/auth';
import { useAppDispatch } from '../../store/store.hooks';
import { saveUserToStore } from '../../store/reducers/auth';
import { IChangeUserData } from '../../types/api/user';

export function useChangeUserData(): UseMutationResult<IUserData, unknown, IChangeUserData> {
  const changeUserDataQuery = (payload: IChangeUserData): Promise<IUserData> => http.put(`/user/profile`, payload);
  const dispatch = useAppDispatch();

  return useMutation(changeUserDataQuery, {
    onSuccess: (data) => {
      dispatch(saveUserToStore(data));
    },
  });
}
