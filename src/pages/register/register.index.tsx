import React, { KeyboardEventHandler, useEffect } from 'react';
import { ITabInfo } from '../../components/console/console.types';
import Console from '../../components/console/console';
import style from './register.style.scss';
import { IRegisterPageProps } from './register.types'
import ConsoleInput from '../../components/consoleInput/consoleInput';

export default function RegisterPage(props: IRegisterPageProps) {
    const { messages, input } = props;
    const tab: ITabInfo[] = [{
        name: 'Login',
        href: '#'
    },
    {
        name: 'Register',
        href: '#',

    }];

    useEffect(()=>{
        focusInput();
    });

    const focusInput = () => {
        setTimeout(()=>{
            document.getElementById('console-input')?.focus();
        }, 0);
    }

    const getInput = () =>
        (document.getElementById('console-input') as HTMLInputElement);

    const getValue = () => 
        getInput()?.value;

    const clearInput = () =>{
        getInput().value = '';
    };
    

    const onKeyDown: KeyboardEventHandler | undefined = (event: React.KeyboardEvent) => {
        if(event.key === 'Enter'){
            console.log('Console input ', getValue());
            clearInput();
        }
    }
    return (
        <Console tabs={tab} selectedTabName="Register" onKeyDownCallback={onKeyDown} onMouseDown={focusInput}>
            <>
                {messages.map(i => 
                    <p className={style.output} key={i}>{i}</p>
                )}
                <ConsoleInput value={input}/>
            </>
        </Console>
    )
}