import {
  DailyForecast,
  Forecast,
  PlacesResponse,
  TodayWeather,
  WeatherForecastResponse,
} from "@/types";
import { weatherCodeDescriptions } from "./code-descriptions";

export async function fetchWeatherForecast({ latitude, longitude }: Forecast) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode&daily=temperature_2m_min,temperature_2m_max,weathercode&timezone=auto`;

    const response = await fetch(url);
    const data = await response.json();

    if (
      !data.daily ||
      !data.daily.temperature_2m_min ||
      !data.daily.temperature_2m_max ||
      !data.daily.weathercode ||
      !data.daily.time
    ) {
      throw new Error("Incomplete data received from API.");
    }

    const todayIndex = 0;

    const today: TodayWeather = {
      date: data.daily.time[todayIndex],
      tempMin: data.daily.temperature_2m_min[todayIndex],
      tempMax: data.daily.temperature_2m_max[todayIndex],
      weatherCode: data.daily.weathercode[todayIndex],
      weatherDescription:
        weatherCodeDescriptions[data.daily.weathercode[todayIndex]] ||
        "Unknown",
    };

    const futureForecast: DailyForecast[] = data.daily.time.map(
      (date: string, idx: number) => ({
        date,
        min: data.daily.temperature_2m_min[idx],
        max: data.daily.temperature_2m_max[idx],
        weatherCode: data.daily.weathercode[idx],
        weatherDescription:
          weatherCodeDescriptions[data.daily.weathercode[idx]] || "Unknown",
      })
    );

    // Return as an array of objects (you can customize the structure)
    return [
      { type: "today", data: today },
      { type: "futureForecast", data: futureForecast },
    ] as WeatherForecastResponse;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

export async function getGeolocation(
  location: string
): Promise<PlacesResponse> {
  try {
    const url = `https://geocode.maps.co/search?q=${encodeURIComponent(
      location
    )}&api_key=688a5f4fe6060916689436dfafef7a7`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Network response was not ok (status: ${response.status})`
      );
    }

    const data: PlacesResponse = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch places:", error);
    throw error;
  }
}
