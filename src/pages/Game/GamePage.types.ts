export interface IGameProps {
  className: string;
}

export interface IGameEndProps {
  endReason: EndReason;
  className: string;
  currentLevelId: number;
  score: number;
}

export enum EndReason {
  DIED,
  ESCAPED,
  UNDEFINED,
}
