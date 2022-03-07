import { ITab } from '../../../components/Console/console.types';
import {
  IMessage,
  StringOnlyValues,
} from '../../../components/ConsoleStrategy/ConsoleStrategy.types';
import { ROUTES } from '../../../services';

export const REGISTER_PAGE_MESSAGES: IMessage<StringOnlyValues>[] = [
  {
    message: 'ssh bugoville...',
  },
  {
    message: 'Please enter your first name:',
    mapToField: 'first_name',
    inputType: 'text',
  },
  {
    message: 'Please enter your second name:',
    mapToField: 'second_name',
    inputType: 'text',
  },
  {
    message: 'Please enter your login:',
    mapToField: 'login',
    inputType: 'text',
  },
  {
    message: 'Please enter your email:',
    mapToField: 'email',
    inputType: 'email',
  },
  {
    message: 'Please enter your phone:',
    mapToField: 'phone',
    inputType: 'text',
  },
  {
    message: 'Please enter your password:',
    mapToField: 'password',
    inputType: 'password',
  },
  {
    message: 'Please repeat your password:',
    mapToField: 'repeatPassword',
    inputType: 'password',
  },
];

export const registerTabs: ITab[] = [
  {
    href: ROUTES.login,
    name: 'login',
    selected: false,
  },
  {
    href: ROUTES.register,
    name: 'register',
    selected: true,
  },
];
