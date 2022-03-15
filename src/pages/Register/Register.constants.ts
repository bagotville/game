import { ITab } from '../../components/Console/Console.types';
import { IMessage, TStringOnlyValues } from '../../components/ConsoleStrategy/ConsoleStrategy.types';
import { ROUTES } from '../../services';
import { InputTypes } from '../../components/Input/Input.types';

export const REGISTER_PAGE_MESSAGES: IMessage<TStringOnlyValues>[] = [
  {
    message: 'ssh bugoville...',
  },
  {
    message: 'Please enter your first name:',
    mapToField: 'first_name',
    inputType: InputTypes.Text,
  },
  {
    message: 'Please enter your second name:',
    mapToField: 'second_name',
    inputType: InputTypes.Text,
  },
  {
    message: 'Please enter your login:',
    mapToField: 'login',
    inputType: InputTypes.Text,
  },
  {
    message: 'Please enter your email:',
    mapToField: 'email',
    inputType: InputTypes.Email,
  },
  {
    message: 'Please enter your phone:',
    mapToField: 'phone',
    inputType: InputTypes.Text,
  },
  {
    message: 'Please enter your password:',
    mapToField: 'password',
    inputType: InputTypes.Password,
  },
  {
    message: 'Please repeat your password:',
    mapToField: 'repeatPassword',
    inputType: InputTypes.Password,
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
