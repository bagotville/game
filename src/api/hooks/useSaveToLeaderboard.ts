import { useMutation, UseMutationResult } from 'react-query';
import { http, TEAM_NAME } from '../../services';
import { ILeaderboardModel, ILeaderData } from '../../types/api/leaderboard';

export function useSaveToLeaderboard(): UseMutationResult<'OK', unknown, ILeaderData> {
  const saveToLeaderboardQuery = (data: ILeaderData): Promise<'OK'> =>
    http.post(`/leaderboard`, { data, ratingFieldName: 'rating', teamName: TEAM_NAME } as ILeaderboardModel);
  return useMutation(saveToLeaderboardQuery);
}
