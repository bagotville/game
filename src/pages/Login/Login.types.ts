import { IMessage, TStringOnlyValues } from '../../components/ConsoleStrategy/ConsoleStrategy.types';

export interface LoginMessages {
  messages: IMessage<TStringOnlyValues>[];
  isAuthRefetch: () => void;
}
