/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { IConsoleProps } from './console.types';
import style from './console.style.scss';

export default function Console(props: IConsoleProps) {
    const { tabs, children, selectedTabName, onMouseDown } = props;
    const { onKeyDownCallback } = props;
    return (
        <div id={style['console-page-container']} 
        onKeyDown={onKeyDownCallback} 
        onMouseDown={onMouseDown} 
        role="textbox" 
        tabIndex={0}>
            <div id={style['console-page-header']}>
                <div id={style['console-page-header-nav']}>
                    <ul>
                        {tabs.map(i =>
                            i.name === selectedTabName ?
                                <li className={style.active} key={i.name}><a href={i.href}>{i.name}</a></li>
                                :
                                <li key={i.name} ><a href={i.href}>{i.name}</a> </li>
                        )}
                    </ul>
                </div>
            </div>
            <div id={style['console-page-body']}>
                {children}
            </div>
        </div>
    )
}