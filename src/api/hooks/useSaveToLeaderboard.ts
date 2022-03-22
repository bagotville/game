import { useMutation, UseMutationResult } from 'react-query';
import { http } from '../../services';
import { ILeaderData } from '../../types/api/leaderboard';

export function useSaveToLeaderboard(): UseMutationResult<'OK', unknown, ILeaderData> {
  const saveToLeaderboardQuery = (payload: ILeaderData): Promise<'OK'> => http.post(`/leaderboard`, payload);
  return useMutation(saveToLeaderboardQuery);
}
