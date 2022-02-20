export interface IConsoleProps {
  tabs?: ITab[];
  header: string;
  children: JSX.Element;
  width?: string;
  height?: string;
  hidden?: boolean;
  enabled?: boolean;
}

export interface ITab {
  name: string;
  selected?: boolean;
  href: string;
}
