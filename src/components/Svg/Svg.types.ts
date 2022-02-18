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
  [Icons.Console]: { color: '#69676C', width: 28, height: 24 },
  [Icons.LogoBug]: { color: '#FCE566', width: 22, height: 26 },
  [Icons.OpenTree]: { color: '#69676C', width: 10, height: 10 },
  [Icons.Forum]: { color: '#98969B', width: 28, height: 28 },
  [Icons.Leaders]: { color: '#98969B', width: 28, height: 28 },
  [Icons.Profile]: { color: '#98969B', width: 28, height: 28 },
};
