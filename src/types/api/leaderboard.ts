export interface ILeaderboardModel {
  data: ILeaderData;
  ratingFieldName: 'rating';
  teamName: string;
}

export interface ILeaderData {
  rating: number;
  avatar: string;
  first_name: string;
  second_name: string;
}

export interface ILeaderboardOptions {
  ratingFieldName: 'rating';
  cursor: number;
  limit: number;
}
