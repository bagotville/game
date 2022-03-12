import colors from '../../styles/colors.scss';

export interface ISvgProps {
  icon: Icons;
  height?: number;
  width?: number;
  className?: string;
  onClick?: (event?: MouseEvent) => void;
}

type TIconsData = {
  [key in Icons]: {
    color: string;
    width: number;
    height: number;
  };
};

export enum Icons {
  Console = 'i_console',
  LogoBug = 'i_logo-bug',
  OpenTree = 'i_open-tree',
  Forum = 'i_forum',
  Leaders = 'i_leaders',
  Profile = 'i_profile',
  Success = 'i_success',
  Warning = 'i_warning',
  Signin = 'i_signin',
  Signup = 'i_signup',
}

export const ICONS_DATA: TIconsData = {
  [Icons.Console]: { color: colors.grayColor, width: 28, height: 24 },
  [Icons.LogoBug]: { color: colors.yellowColor, width: 22, height: 26 },
  [Icons.OpenTree]: { color: colors.grayColor, width: 10, height: 10 },
  [Icons.Forum]: { color: colors.lightGrayColor, width: 28, height: 28 },
  [Icons.Leaders]: { color: colors.lightGrayColor, width: 28, height: 28 },
  [Icons.Profile]: { color: colors.lightGrayColor, width: 28, height: 28 },
  [Icons.Success]: { color: colors.greenColor, width: 14, height: 14 },
  [Icons.Warning]: { color: colors.pinkColor, width: 12, height: 12 },
  [Icons.Signin]: { color: colors.blackGrayColor, width: 12, height: 18 },
  [Icons.Signup]: { color: colors.blackGrayColor, width: 20, height: 18 },
};
