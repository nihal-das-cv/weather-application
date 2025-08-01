import { WeatherForecastResponse } from "@/types";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const WeatherScreen: React.FC<{
  data: WeatherForecastResponse;
  place: string;
}> = ({ data, place }) => {
  const firstPlace = place.split(",")[0];
  const lastTwoPlaces = place.split(",").slice(-2).join(", ");

  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer: number = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Main content */}
      {data ? (
        <View style={styles.card}>
          {/* Row: temp and time */}
          <View style={styles.row}>
            <Text style={styles.tempValue}>
              {Math.floor(
                (data?.[0].data?.tempMax + data?.[0].data?.tempMin) / 2
              )}
            </Text>
            <Text style={styles.tempUnit}>°C</Text>
            <View style={styles.flexGrow} />
            <Text style={styles.time}>{time.toLocaleTimeString()}</Text>
          </View>

          {/* Decoy container for the icon/illustration */}
          <View style={styles.decoyContainer} />

          {/* Weather condition, vertically */}
          <View style={styles.conditionContainer}>
            {data?.[0].data?.weatherDescription.split("").map((c, i) => (
              <Text key={i} style={styles.conditionLetter}>
                {c}
              </Text>
            ))}
          </View>

          {/* City label */}
          <Text style={styles.city}>{firstPlace}</Text>
          <Text style={styles.city}>{lastTwoPlaces}</Text>

          {/* Days row */}
          <View style={styles.daysRow}>
            {data?.[1].data?.map((day, idx) => (
              <View key={idx} style={styles.dayItem}>
                <View style={styles.iconDecoySmall} />
                <Text style={styles.dayLabel}>{day.date}</Text>
                <Text style={styles.dayLabel}>
                  {Math.floor((day.max + day.min) / 2)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View>
          <Text>Not Found</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // makes it take the whole screen
    // backgroundColor: '#DDD8D3',
    justifyContent: "flex-start", // or 'center', as desired
    alignItems: "stretch",
  },
  card: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between", // <-- NEW: spreads content vertically
    backgroundColor: "#F9F6F2",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    width: "100%",
    marginBottom: 16,
  },
  tempValue: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#303030",
  },
  tempUnit: {
    fontSize: 24,
    marginBottom: 6,
    color: "#303030",
    marginLeft: 2,
  },
  flexGrow: {
    flex: 1,
  },
  time: {
    fontSize: 16,
    color: "#8C8B89",
    marginBottom: 8,
  },
  decoyContainer: {
    width: 92,
    height: 56,
    borderRadius: 48,
    marginVertical: 14,
    opacity: 0.9,
    backgroundColor: "#E44C38",
  },
  conditionContainer: {
    position: "absolute",
    right: 20,
    top: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  conditionLetter: {
    fontSize: 15,
    color: "#A39E99",
    letterSpacing: 2,
  },
  city: {
    fontSize: 17,
    color: "#8C8B89",
    letterSpacing: 2,
    marginVertical: 12,
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 28,
  },
  dayItem: {
    alignItems: "center",
    width: 30,
  },
  iconDecoySmall: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#D6D5D1",
    marginBottom: 2,
  },
  dayLabel: {
    fontSize: 10,
    color: "#A9A6A2",
  },
});

export default WeatherScreen;
