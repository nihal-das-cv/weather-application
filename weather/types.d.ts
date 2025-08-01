export interface Place {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: [string, string, string, string];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
}

export interface TodayWeather {
  date: string;
  tempMin: number;
  tempMax: number;
  weatherCode: number;
  weatherDescription: string;
}

export interface DailyForecast {
  date: string;
  min: number;
  max: number;
  weatherCode: number;
  weatherDescription: string;
}

export interface TodayForecastItem {
  type: "today";
  data: TodayWeather;
}

export interface FutureForecastItem {
  type: "futureForecast";
  data: DailyForecast[];
}

export interface Forecast {
  latitude: string;
  longitude: string;
}

export type WeatherForecastResponse =
  | [TodayForecastItem, FutureForecastItem]
  | null;

export type PlacesResponse = Place[];
