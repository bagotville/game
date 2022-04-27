import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import styles from './Button.scss';
import { IPropsButton } from './Button.types';
import { isDarkScheme } from '../../store/reducers/scheme';

export function Button(props: IPropsButton) {
  const { name, color = 'blue', disabled = false, onClick, className: externalClassName } = props;

  const isDark = useSelector(isDarkScheme);

  const buttonClasses = classNames(styles.button, externalClassName, {
    [styles.button_dark]: isDark,
  });
  const textBtnClasses = classNames(styles.text, styles[`color-${color}`]);

  return (
    <button disabled={disabled} type="button" onClick={onClick} className={buttonClasses}>
      [ <span className={textBtnClasses}>{name}</span> ]
    </button>
  );
}
