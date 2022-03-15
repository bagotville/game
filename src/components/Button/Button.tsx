import React from 'react';
import classNames from 'classnames';
import styles from './Button.scss';
import { IPropsButton } from './Button.types';

export function Button(props: IPropsButton) {
  const {
    name,
    color = 'blue',
    disabled = false,
    onCLick,
    className: externalClassName,
  } = props;

  const buttonClasses = classNames(styles.button, externalClassName);
  const textBtnClasses = classNames(styles.text, styles[`color-${color}`]);

  return (
    <button
      disabled={disabled}
      type="button"
      onClick={onCLick}
      className={buttonClasses}>
      [ <span className={textBtnClasses}>{name}</span> ]
    </button>
  );
}
