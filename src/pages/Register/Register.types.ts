import { IMessage, TStringOnlyValues } from '../../components/ConsoleStrategy/ConsoleStrategy.types';

export interface RegisterPageMessages {
  messages: IMessage<TStringOnlyValues>[];
  isAuthRefetch: () => void;
}
