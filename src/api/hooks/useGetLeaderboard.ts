import { useMutation, UseMutationResult } from 'react-query';
import { http } from '../../services';
import { ILeaderboardOptions } from '../../types/api/leaderboard';

export function useGetLeaderboard(): UseMutationResult<any[], unknown, ILeaderboardOptions> {
  // should be team instead of all
  const getLeaderboardQuery = (payload: ILeaderboardOptions): Promise<any[]> => http.post(`/leaderboard/all`, payload);
  return useMutation(getLeaderboardQuery);
}
