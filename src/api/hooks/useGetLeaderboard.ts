import { useMutation, UseMutationResult } from 'react-query';
import { http, TEAM_NAME } from '../../services';
import { ILeaderboardOptions, ILeaderData } from '../../types/api/leaderboard';

export function useGetLeaderboard(): UseMutationResult<{ data: ILeaderData }[], unknown, ILeaderboardOptions> {
  const getLeaderboardQuery = (payload: ILeaderboardOptions): Promise<{ data: ILeaderData }[]> =>
    http.post(`/leaderboard/${TEAM_NAME}`, payload);
  return useMutation(getLeaderboardQuery);
}
