import React from 'react';
import { ITabInfo } from '../../components/console/console.types';
import Console from '../../components/console/console';
import style from './register.style.scss';
import { IRegisterPageProps } from './register.types'

export default function RegisterPage(props: IRegisterPageProps){
    const tab :ITabInfo[] = [{
        name: 'Login',
        href: '#'
    },
{
    name:'Register',
    href: '#'
}];
    return(
        <Console tabs={tab} selectedTabName="Register">
            <>
                <p>signup to bagoville...</p>
                <p>please enter your login:</p>
            </>
        </Console>
    )
}