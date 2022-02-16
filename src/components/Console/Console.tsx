import React from "react";
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "./Console.constant";
import style from './Console.style.scss';
import { IConsoleProps } from "./console.types";

export default function Console(props: IConsoleProps) {
    const { tabs, header, children, width, height, hidden, enabled } = props;
    const isTabsExists = tabs && tabs.length > 0;
    const realWidth = width || DEFAULT_WIDTH;
    const realHeight = height || DEFAULT_HEIGHT;
    const realHidden = hidden || false;
    const realEnabled = enabled || true;

    return (
        <div id={style['console-window']}
            hidden={realHidden}
            className={realEnabled ? 'disabled' : ''}
            style={{ width: realWidth, height: realHeight }}>
            <div id={style['console-header']}>
                <div>
                    <h4>{header}</h4>
                </div>
                {isTabsExists ?
                    <div id={style['tab-container']}>
                        <ul>
                            {tabs.map(tab =>
                                <li className={tab.selected ? [style.tab, style['tab-selected']].join(' ') : style.tab}
                                    key={tab.name}>
                                    <a href={tab.href} key={tab.href}>{tab.name}</a>
                                </li>
                            )}
                        </ul>
                    </div>
                    : ''}
            </div>
            <div id={style['console-content']}>
                {children}
            </div>
        </div>
    )
}
