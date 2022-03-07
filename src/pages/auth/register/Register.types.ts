import {
  IMessage,
  StringOnlyValues,
} from '../../../components/ConsoleStrategy/ConsoleStrategy.types';

export interface RegisterProps extends StringOnlyValues {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
  repeat_password: string;
}

export interface RegisterPageMessages {
  messages: IMessage<StringOnlyValues>[];
}
