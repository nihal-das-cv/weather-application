import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Href } from "expo-router";
import { useEffect } from "react";
import Weather from "@/components/weather";

export default function Index() {
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("access");

        if (value == null) {
          router.replace("/welcome" as Href);
        }
      } catch (e) {
        console.error(e);
      }
    };

    getData();
  }, []);

  return (
    <View style={{ flex: 1}}>
      <Weather />
    </View>
  );
}
