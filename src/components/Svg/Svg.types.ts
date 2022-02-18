import colors from '../../styles/colors.scss';

export interface ISvgProps {
  icon: Icons;
  height?: number;
  width?: number;
  className?: string;
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
}

export const ICONS_DATA: TIconsData = {
  [Icons.Console]: { color: colors['gray-color'], width: 28, height: 24 },
  [Icons.LogoBug]: { color: colors['yellow-color'], width: 22, height: 26 },
  [Icons.OpenTree]: { color: colors['gray-color'], width: 10, height: 10 },
  [Icons.Forum]: { color: colors['light-gray-color'], width: 28, height: 28 },
  [Icons.Leaders]: { color: colors['light-gray-color'], width: 28, height: 28 },
  [Icons.Profile]: { color: colors['light-gray-color'], width: 28, height: 28 },
};
