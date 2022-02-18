import React from 'react';
import classNames from 'classnames';
import styles from './Svg.scss';
import { ICONS_DATA, ISvgProps } from './Svg.types';
import sprite from '../../assets/images/sprite.svg';

export function Svg(props: ISvgProps) {
  const { icon, className: externalClassName, height, width } = props;
  const svgClass = classNames(styles.image, externalClassName);

  return (
    <svg
      className={svgClass}
      fill={ICONS_DATA[icon].color}
      width={width || ICONS_DATA[icon].width}
      height={height || ICONS_DATA[icon].height}>
      <use xlinkHref={`${sprite}#${icon}`} />
    </svg>
  );
}
