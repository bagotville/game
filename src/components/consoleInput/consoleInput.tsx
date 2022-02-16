import React from 'react';
import style from './consoleInput.style.scss';
import { IConsoleInputProps } from './consoleInput.types';

export default function (props: IConsoleInputProps) {
    const { value, isEnabled, isVisible } = props;
    const isDisabled = isEnabled ? !isEnabled : false;
    const isHidden = isVisible ? !isVisible : false;
    let valueAsStr: string;
    if (value) {
        valueAsStr = value as string;
    } else {
        valueAsStr = "";
    }
    return (
        <input className={style.consoleInput}
            type='text'
            defaultValue={valueAsStr} id='console-input'
            disabled={isDisabled} hidden={isHidden} />
    )
}