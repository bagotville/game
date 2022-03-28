import { useMutation, UseMutationResult } from 'react-query';
import { http } from '../../services';
import { removeUserFromStore } from '../../store/reducers/auth';
import { useAppDispatch } from '../../store/store.hooks';

export function useLogout(): UseMutationResult<'OK'> {
  const signInQuery = (): Promise<'OK'> => http.post(`/auth/logout`);
  const dispatch = useAppDispatch();

  return useMutation(signInQuery, {
    onSuccess: () => {
      dispatch(removeUserFromStore());
    },
  });
}
