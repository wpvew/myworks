import { ActionCreator } from 'redux';

export enum ETypeTemp {
  fahrenheit = 'fahrenheit',
  celsius = 'celsius',
}

// export type TTypeTempData = {
//   typeTemp: ETypeTemp;
// };

export const UPDATE_TYPE_TEMPERATURE = 'UPDATE_TYPE_TEMPERATURE';
export type TUpdateTypeTemperature = {
  type: typeof UPDATE_TYPE_TEMPERATURE;
  typeTemp: ETypeTemp;
};
export const updateTypeTemperature: ActionCreator<TUpdateTypeTemperature> = (
  typeTemp: ETypeTemp
) => ({
  type: UPDATE_TYPE_TEMPERATURE,
  typeTemp,
});
