import { useMutation, UseMutationResult } from 'react-query';
import { http } from '../../services';

export function useOAuth(): UseMutationResult<'OK', unknown, { code: string }> {
  const oAuthQuery = (payload: { code: string }): Promise<'OK'> => http.post(`/oauth/yandex`, payload);

  return useMutation(oAuthQuery);
}
