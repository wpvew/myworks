export const useWindDirection = (windDir: string): number => {
  switch (windDir) {
    case 'S':
      return 270;
    case 'N':
      return 90;
    case 'E':
      return 180;
    case 'W':
      return 0;
    case 'SE':
      return 225;
    case 'SW':
      return 315;
    case 'NE':
      return 135;
    case 'NW':
      return 45;
    case 'NNE':
      return 112.5;
    case 'ENE':
      return 157.5;
    case 'ESE':
      return 202.5;
    case 'SSE':
      return 247.5;
    case 'SSW':
      return 292.5;
    case 'WSW':
      return 337.5;
    case 'WNW':
      return 22.5;
    case 'NNW':
      return 67.5;
    default:
      return 0;
  }
};
