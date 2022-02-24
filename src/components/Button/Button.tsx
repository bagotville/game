import React from 'react';
import styles from './Button.scss';
import { IPropsButton } from './Button.types';

export function Button(props: IPropsButton) {
  const { name, type = 'confirm', disabled = false, onCLick } = props;

  return (
    <button
      disabled={disabled}
      type="button"
      onClick={onCLick}
      className={styles.button}>
      [ <span className={styles[type]}>{name}</span> ]
    </button>
  );
}
