import { KeyboardEventHandler, MouseEventHandler } from 'react';
import { IProps } from '../../types'

export interface IConsoleProps extends IProps {
    tabs: ITabInfo[],
    selectedTabName: string,
    // eslint-disable-next-line no-undef
    children: JSX.Element,
    onKeyDownCallback: KeyboardEventHandler | undefined;
    onMouseDown: MouseEventHandler | undefined;
}

export interface ITabInfo {
    href: string,
    name: string
}