import React from 'react';
import styles from './ErrorFallback.scss';
import { Svg } from '../../components/Svg';
import { Icons } from '../../components/Svg/Svg.types';
import { Button } from '../../components/Button';
import { ROUTES } from '../../services';

export function ErrorFallbackStub() {
  return (
    <div className={styles['error-fallback']}>
      <div className={styles['error-message']}>
        <span className={styles.title}>
          <Svg icon={Icons.LogoBug} /> Bugs win =(
        </span>
        <pre />
        {location.pathname === ROUTES.home ? (
          <Button name="Reload page" onClick={() => document.location.reload()} />
        ) : (
          <Button name="To Home Page" />
        )}
      </div>
    </div>
  );
}
