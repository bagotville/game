import React from 'react';
import classNames from 'classnames';
import styles from './Svg.scss';
import { ICONS_DATA, ISvgProps } from './Svg.types';
import sprite from '../../assets/images/sprite.svg';

export function Svg(props: ISvgProps) {
  const { icon, className: externalClassName, height, width, onClick } = props;
  const svgClasses = classNames(styles.image, externalClassName);

  return (
    <svg
      className={svgClasses}
      fill={ICONS_DATA[icon].color}
      width={width || ICONS_DATA[icon].width}
      height={height || ICONS_DATA[icon].height}
      onClick={(e) => {
        onClick?.(e);
      }}>
      <use xlinkHref={`${sprite}#${icon}`} />
    </svg>
  );
}
