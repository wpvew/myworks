import axios from 'axios';
import { getCapitalLetter } from '../utils/getCapitalLetter';

export class ApiServer {
  static getForecastWeather(location: string) {
    return axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=120a103ec8454d949cf141146222410&q=${location}&days=9&aqi=no&alerts=no`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  static getLocationsWeather(location: string) {
    return axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=120a103ec8454d949cf141146222410&q=${location}&days=9&aqi=no&alerts=no`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  static getCities(value: string) {
    // axios.get('https://nominatim.openstreetmap.org/search?city=москв&format=json&addressdetails=1')
    return axios.get(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=5&offset=0&namePrefix=${getCapitalLetter(
        value
      )}`,
      {
        headers: {
          'X-RapidAPI-Key': 'dd8f2152ffmsh5995ce4705e06a1p1a7e68jsn542666b63bb9',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        },
      }
    );
  }
  static getGeolocation() {
    return axios.get('https://ipapi.co/json/', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
