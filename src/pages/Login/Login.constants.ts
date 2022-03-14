import { ITab } from '../../components/Console/Console.types';
import { IMessage, TStringOnlyValues } from '../../components/ConsoleStrategy/ConsoleStrategy.types';
import { ROUTES } from '../../services';
import { InputTypes } from '../../components/Input/Input.types';

export const LOGIN_MESSAGES: IMessage<TStringOnlyValues>[] = [
  {
    message: 'ssh bugoville...',
  },
  {
    message: 'Please enter you login to grant sudo privileges:',
    mapToField: 'login',
    inputType: InputTypes.Text,
  },
  {
    message: 'Please enter your password:',
    mapToField: 'password',
    inputType: InputTypes.Password,
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
