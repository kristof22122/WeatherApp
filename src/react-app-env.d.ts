/// <reference types="react-scripts" />

interface WeatherFromAPI {
  coord: Coord,
  weather: Weather[],
  main: Main,
  dt: number,
  id: number,
  name: string,
  cod: number,
  wind: Wind,
  sys: Sys,
}

interface Coord {
  lon: number,
  lat: number,
}

interface Weather {
  id: number,
  main: string,
  description: string,
  icon: string,
}

interface Main {
  temp: number,
  feels_like: number,
  temp_min: number,
  temp_max: number,
  pressure: number,
  humidity: number,
}

interface Wind {
  speed: number,
  deg: number,
}

interface Sys {
  type: number,
  id: number,
  country: string,
  sunrise: number,
  sunset: number,
}
