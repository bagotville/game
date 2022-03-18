import { useMutation, UseMutationResult } from 'react-query';
import { http } from '../../services';
import { saveUserToStore } from '../../store/reducers/auth';
import { useAppDispatch } from '../../store/store.hooks';
import { IUserData } from '../../types/api/auth';

export function useChangeAvatar(): UseMutationResult<IUserData, unknown, File> {
  const changeAvatarQuery = (payload: File): Promise<IUserData> => {
    const formData = new FormData();
    formData.append('avatar', payload);

    return http.put(`/user/profile/avatar`, formData);
  };
  const dispatch = useAppDispatch();

  return useMutation(changeAvatarQuery, {
    onSuccess: (data) => {
      dispatch(saveUserToStore(data));
    },
  });
}
