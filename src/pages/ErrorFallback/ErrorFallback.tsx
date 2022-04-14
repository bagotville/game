import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ErrorFallback.scss';
import { Svg } from '../../components/Svg';
import { Icons } from '../../components/Svg/Svg.types';
import { Button } from '../../components/Button';
import { ROUTES } from '../../services';

export function ErrorFallback(props: Partial<FallbackProps>) {
  const { error } = props;

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles['error-fallback']}>
      <div className={styles['error-message']}>
        <span className={styles.title}>
          <Svg icon={Icons.LogoBug} /> Bugs win =(
        </span>
        <pre>{error?.message}</pre>
        {location.pathname === ROUTES.home ? (
          <Button name="Reload page" onClick={() => document.location.reload()} />
        ) : (
          <Button onClick={() => navigate(ROUTES.home)} name="To Home Page" />
        )}
      </div>
    </div>
  );
}
