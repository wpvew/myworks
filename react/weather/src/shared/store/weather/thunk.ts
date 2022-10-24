import { Action, ThunkAction } from '@reduxjs/toolkit';
import { useState } from 'react';
import { RootStateOrAny } from 'react-redux';
import { ApiServer } from '../../API/ApiServer';
import {
  TCurrentWeatherData,
  TForecastWeatherData,
  TResponseCurrent,
  TResponseServerForecast,
} from '../../hooks/useWeatherData';
import { getCutString } from '../../utils/getCutString';
import { updateWeatherData, updateWeatherDataError, updateWeatherDataSuccess } from './action';

export const updateWeatherDataAsync =
  (location: string): ThunkAction<void, RootStateOrAny, unknown, Action<any>> =>
  (dispatch) => {
    let diffTemp_c = 0;
    let diffTemp_f = 0;
    dispatch(updateWeatherData());

    ApiServer.getForecastWeather(location)
      .then(({ data }) => {
        dispatch(
          updateWeatherDataSuccess({
            currentWeatherData: createCurrentWeatherObj(data),
            hourlyWeatherData: createHourlyWeatherObj(data),
            weeklyWeatherData: createWeeklyWeatherObj(data),
          })
        );
      })
      .catch((err) => {
        dispatch(updateWeatherDataError(err.response.data.error.message));
        console.log(err);
      });

    function createCurrentWeatherObj({
      location,
      current,
      forecast: {
        forecastday: [{ day, astro, hour }],
      },
    }: TResponseCurrent): TCurrentWeatherData {
      diffTemp_c = Math.round(
        hour.filter(
          (item) => new Date(item.time.replace(/-/g, '/')).getHours() === new Date().getHours()
        )[0]['temp_c'] - current['temp_c']
      );
      diffTemp_f = Math.round(
        hour.filter(
          (item) => new Date(item.time.replace(/-/g, '/')).getHours() === new Date().getHours()
        )[0]['temp_f'] - current['temp_f']
      );
      return {
        location: location['name'],
        region: location['region'],
        weekday: new Date(location['localtime'].replace(/-/g, '/')).toLocaleString('en-US', {
          weekday: 'long',
        }),
        localtime: location['localtime'],
        temp_c: Math.round(current['temp_c']) + ' °С',
        temp_f: Math.round(current['temp_f']) + ' °F',
        maxtemp_c: Math.round(day['maxtemp_c']) + '°',
        maxtemp_f: Math.round(day['maxtemp_f']) + '°',
        mintemp_c: Math.round(day['mintemp_c']) + '°',
        mintemp_f: Math.round(day['mintemp_f']) + '°',
        condition_icon: 'https:' + current['condition']['icon'],
        condition_name: current['condition']['text'],
        uv: current['uv'],
        visibility: current['vis_km'] + ' km',
        pressure: (current['pressure_mb'] * 0.750062).toFixed(2) + ' mm Hg',
        feelslike_c: Math.round(current['feelslike_c']) + ' °С',
        feelslike_f: Math.round(current['feelslike_f']) + ' °F',
        wind_kph: (current['wind_kph'] / 3.6).toFixed(2) + ' m/s',
        wind_dir: current['wind_dir'],
        humidity: current['humidity'] + ' %',
        precip_mm: current['precip_mm'] + ' mm',
        sunset: astro['sunset'],
        sunrise: astro['sunrise'],
        timezone: location['tz_id'],
      };
    }

    function createHourlyWeatherObj({
      location,
      current,
      forecast: { forecastday },
    }: {
      location: { localtime: string };
      current: Record<string, any>;
      forecast: { forecastday: Array<{ date: string; hour: Array<Record<string, any>> }> };
    }): Array<TForecastWeatherData> {
      const arrayHours = [
        ...(forecastday
          .find(
            (item) =>
              new Date(item.date).getDate() ===
              new Date(location.localtime.replace(/-/g, '/')).getDate()
          )
          ?.hour.filter(
            (item: any) =>
              new Date(item.time.replace(/-/g, '/')).getHours() >=
              new Date(location.localtime.replace(/-/g, '/')).getHours() - 1
          ) || []),

        ...(forecastday
          .find(
            (item) =>
              new Date(item.date).getDate() ===
              new Date(location.localtime.replace(/-/g, '/')).getDate() + 1
          )
          ?.hour.filter(
            (item: any) =>
              new Date(item.time.replace(/-/g, '/')).getHours() <
              new Date(location.localtime.replace(/-/g, '/')).getHours() - 1
          ) || []),
      ].map((data: Record<string, any>): TForecastWeatherData => {
        const isCurrent =
          new Date(data['time'].replace(/-/g, '/')).getHours() ===
          new Date(location.localtime.replace(/-/g, '/')).getHours();

        return {
          isCurrent,
          date: isCurrent
            ? 'Now'
            : new Date(data['time'].replace(/-/g, '/'))
                .getHours()
                .toLocaleString('en-EN', { minimumIntegerDigits: 2 })
                .toString(),
          temp_c: Math.round(data['temp_c'] - diffTemp_c),
          temp_f: Math.round(data['temp_f'] - diffTemp_f),
          condition_icon: isCurrent
            ? 'https:' + current['condition']['icon']
            : 'https:' + data['condition']['icon'],
          condition_name: isCurrent ? current['condition']['text'] : data['condition']['text'],
        };
      });
      return arrayHours;
    }

    function createWeeklyWeatherObj({
      location,
      forecast: { forecastday },
    }: TResponseServerForecast): Array<TForecastWeatherData> {
      return forecastday.map((data: Record<string, any>): TForecastWeatherData => {
        const isCurrent =
          new Date(data['date'].replace(/-/g, '/')).getDate() ===
          new Date(location.localtime.replace(/-/g, '/')).getDate();
        return {
          isCurrent,
          date: getCutString(
            new Date(data['date'].replace(/-/g, '/')).toLocaleString('en-US', { weekday: 'long' })
          ),
          temp_c: Math.round(data['day']['avgtemp_c']),
          temp_f: Math.round(data['day']['avgtemp_f']),
          condition_icon: 'https:' + data['day']['condition']['icon'],
          condition_name: data['day']['condition']['text'],
        };
      });
    }
  };
