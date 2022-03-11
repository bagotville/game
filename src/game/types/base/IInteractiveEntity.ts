export interface IInteractiveEntity {
  onKeyDown: (keyEvent: KeyboardEvent) => void;
  onKeyUp: (keyEvent: KeyboardEvent) => void;
}
