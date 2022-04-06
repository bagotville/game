import React from 'react';
import classNames from 'classnames';
import styles from './Button.scss';
import { IPropsButton } from './Button.types';

export function Button(props: IPropsButton) {
  const { name, color = 'blue', disabled = false, onClick, className: externalClassName } = props;

  const buttonClasses = classNames(styles.button, externalClassName);
  const textBtnClasses = classNames(styles.text, styles[`color-${color}`]);

  return (
    <button disabled={disabled} type="button" onClick={onClick} className={buttonClasses}>
      [ <span className={textBtnClasses}>{name}</span> ]
    </button>
  );
}
