import { ITab } from '../../../components/Console/console.types';
import {
  IMessage,
  StringOnlyValues,
} from '../../../components/ConsoleStrategy/ConsoleStrategy.types';
import { ROUTES } from '../../../services';

export const LOGIN_MESSAGES: IMessage<StringOnlyValues>[] = [
  {
    message: 'ssh bugoville...',
  },
  {
    message: 'Please enter you login to grant sudo privelegies:',
    mapToField: 'login',
    inputType: 'text',
  },
  {
    message: 'Please enter your password:',
    mapToField: 'password',
    inputType: 'password',
  },
];

export const loginTabs: ITab[] = [
  {
    href: ROUTES.login,
    name: 'login',
    selected: true,
  },
  {
    href: ROUTES.register,
    name: 'register',
    selected: false,
  },
];
