import React from "react";
import classNames from "classnames";
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "./Console.constant";
import style from './Console.style.scss';
import { IConsoleProps } from "./console.types";

export default function Console(props: IConsoleProps) {
    const { 
        tabs, 
        header, 
        children, 
        width = DEFAULT_WIDTH, 
        height = DEFAULT_HEIGHT, 
        hidden = false, 
        enabled = true } = props;
    const isTabsExists = tabs && tabs.length > 0;

    return (
        <div className={classNames(style['console-window'], enabled ? null : style.disabled)}
            hidden={hidden}
            style={{ width, height }}>
            <div className={style['console-header']}>
                <div>
                    <h4>{header}</h4>
                </div>
                {isTabsExists ?
                    <div className={style['tab-container']}>
                        <ul>
                            {tabs.map(tab =>
                                <li className={tab.selected ? [style.tab, style['tab-selected']].join(' ') : style.tab}
                                    key={tab.name}>
                                    <a href={tab.href} key={tab.href}>{tab.name}</a>
                                </li>
                            )}
                        </ul>
                    </div>
                    : null}
            </div>
            <div className={style['console-content']}>
                {children}
            </div>
        </div>
    );
}
