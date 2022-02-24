import React from 'react';
import classNames from 'classnames';
import styles from './Button.scss';
import { IPropsButton } from './Button.types';

export function Button(props: IPropsButton) {
  const {
    name,
    type = 'confirm',
    disabled = false,
    onCLick,
    className: externalClassName,
  } = props;

  const buttonClasses = classNames(styles.button, externalClassName);

  return (
    <button
      disabled={disabled}
      type="button"
      onClick={onCLick}
      className={buttonClasses}>
      [ <span className={styles[type]}>{name}</span> ]
    </button>
  );
}
