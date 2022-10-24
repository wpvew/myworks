import React from 'react';
import { useSelector } from 'react-redux';
import { Compass } from '../components/Compass';
import { EIcons } from '../components/Icon';
import { Sunday } from '../components/Sunday';
import { UvRange } from '../components/UvRange';
import { TRootState } from '../store/storeRedux';
import { ETypeTemp } from '../store/typeTemperature/action';
import { EViewport } from '../store/viewport/action';
import { TCurrentWeatherData } from './useWeatherData';

export const useWidgets = (data: TCurrentWeatherData) => {
  const typeTemp = useSelector<TRootState, ETypeTemp>((state) => state.typeTemp);
  const viewport = useSelector<TRootState, EViewport>((state) => state.viewport);

  const widgetList = [
    createWidgetList(
      'feels like',
      typeTemp === ETypeTemp.celsius ? data.feelslike_c : data.feelslike_f,
      EIcons.feelsLike,
      'Similar to the actual temperature'
    ),
    createWidgetList(
      'sunrise',
      data.sunrise,
      EIcons.sunrise,
      viewport !== EViewport.desktop ? `Sunset: ${data.sunset}` : '',
      <Sunday />
    ),
    createWidgetList('humidity', data.humidity, EIcons.humidity),
    createWidgetList('precipitation', data.precip_mm, EIcons.rain),
    createWidgetList('pressure', data.pressure, EIcons.pressure),
    createWidgetList('uv index', data.uv, EIcons.sun, '', <UvRange />),
    createWidgetList('visibility', data.visibility, EIcons.eye),
    createWidgetList(
      'wind',
      viewport !== EViewport.desktop ? data.wind_kph + ' ' + data.wind_dir : '',
      EIcons.wind,
      '',
      <Compass />
    ),
  ];

  return [widgetList];
};

function createWidgetList(
  name: string,
  value: number | string,
  icon: EIcons,
  addParams?: string,
  map?: JSX.Element
) {
  return {
    name: name.toUpperCase(),
    value,
    icon,
    map,
    addParams,
  };
}
