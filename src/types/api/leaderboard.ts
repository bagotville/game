export interface ILeaderData {
  data: any;
  ratingFieldName: string;
  teamName: string;
}

export interface ILeaderboardOptions {
  ratingFieldName: string;
  cursor: number;
  limit: number;
}
