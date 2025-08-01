import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { fetchWeatherForecast, getGeolocation } from "@/utils/weather";
import { PlacesResponse, WeatherForecastResponse } from "@/types";
import { useState, useCallback } from "react";

import debounce from "@/utils/debounce";
import WeatherApp from "./WeatherScreen";
import WeatherScreen from "./WeatherScreen";

export default function Weather() {
  const [data, setData] = useState<WeatherForecastResponse>(null);
  const [places, setPlaces] = useState<PlacesResponse>([]);
  const [text, setText] = useState<string>("");

  console.log(data)

  const debouncedLog = useCallback(
    debounce(async (query: string) => {
      if (!query) {
        setPlaces([]);
        return;
      }

      try {
        const data = await getGeolocation(query);
        setPlaces(data);
      } catch (error) {
        console.error("Geolocation error:", error);
        setPlaces([]);
      }
    }, 600),
    []
  );

  const changeText = (newText: string): void => {
    setText(newText);
    debouncedLog(newText);
  };

  const changePlace = async (
    place: string,
    latitude: string,
    longitude: string
  ): Promise<void> => {
    setText(place);
    Keyboard.dismiss();

    try {
      setPlaces([]);

      const result = await fetchWeatherForecast({ latitude, longitude });

      setData(result);
    } catch (error) {
      console.error("Weather fetch error:", error);
      setData(null);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={changeText}
        placeholder="Enter location"
      />
      <ScrollView style={styles.scrollView}>
        {places.map((place) => (
          <View key={place.place_id} style={styles.placeContainer}>
            <Text
              style={styles.placeName}
              onPress={() =>
                changePlace(place.display_name, place.lat, place.lon)
              }
            >
              {place.display_name}
            </Text>
          </View>
        ))}
      </ScrollView>
      <WeatherScreen data={data} place={text} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  scrollView: {
    flexGrow: 0,
  },
  placeContainer: {
    marginBottom: 12,
  },
  placeName: {
    fontSize: 16,
  },
});
