import React from 'react';
import SunriseIcon from '../icons/SunriseIcon';
import SunIcon from '../icons/SunIcon';
import MenuIcon from '../icons/MenuIcon';
import HumidityIcon from '../icons/HumidityIcon';
import ArrowIcon from '../icons/ArrowIcon';
import WindIcon from '../icons/WindIcon';
import RainIcon from '../icons/RainIcon';
import PressureIcon from '../icons/PressureIcon';
import FeelsLikeIcon from '../icons/FeelsLikeIcon';
import EyeIcon from '../icons/EyeIcon';

export enum EIcons {
  sunrise = 'SunriseIcon',
  sun = 'SunIcon',
  menu = 'MenuIcon',
  humidity = 'HumidityIcon',
  arrow = 'ArrowIcon',
  wind = 'WindIcon',
  rain = 'RainIcon',
  pressure = 'PressureIcon',
  feelsLike = 'FeelsLikeIcon',
  eye = 'EyeIcon',
}

interface IIconProps {
  name: EIcons;
}
export function Icon({ name }: IIconProps) {
  const iconComponents = {
    SunriseIcon,
    SunIcon,
    MenuIcon,
    HumidityIcon,
    ArrowIcon,
    WindIcon,
    RainIcon,
    PressureIcon,
    FeelsLikeIcon,
    EyeIcon,
  };
  const IconComponent = iconComponents[name];

  return <IconComponent />;
}
