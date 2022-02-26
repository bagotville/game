import React from 'react';
import classNames from 'classnames';
import styles from './Input.scss';
import { IInputProps } from './Input.types';
import { Icons } from '../Svg/Svg.types';
import { Svg } from '../Svg';

export function Input(props: IInputProps) {
  const {
    id,
    value,
    label,
    type,
    autoComplete = 'off',
    isValid = false,
    isInvalid = false,
    errorMessage = '',
    successMessage = '',
    className: externalClassName,
    disabled = false,
    onInput,
  } = props;

  const inputWrapperClasses = classNames(
    styles['input-wrapper'],
    externalClassName,
  );

  const inputClasses = classNames(styles.input, {
    [styles.error]: isInvalid,
    [styles.success]: isValid,
    [styles.disabled]: disabled,
  });

  return (
    <div className={inputWrapperClasses}>
      <label htmlFor={id}>{label}:</label>
      <input
        className={inputClasses}
        id={id}
        value={value}
        disabled={disabled}
        autoComplete={autoComplete}
        type={type}
        onInput={(e) => (onInput ? onInput(e) : null)}
      />
      {isValid ? (
        <div className={`${styles.notice} ${styles.notice_success}`}>
          <Svg icon={Icons.Success} />
          <span>{successMessage}</span>
        </div>
      ) : null}
      {isInvalid ? (
        <div className={`${styles.notice} ${styles.notice_error}`}>
          <Svg icon={Icons.Warning} />
          <span>{errorMessage}</span>
        </div>
      ) : null}
    </div>
  );
}
