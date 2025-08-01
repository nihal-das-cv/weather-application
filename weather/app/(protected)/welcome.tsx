import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Href, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const { width: screenWidth } = Dimensions.get("window");

// Responsive sizes
const IMAGE_SIZE = Math.round(screenWidth * 0.35);
const TITLE_SIZE = Math.max(20, Math.round(screenWidth / 20));
const TEXT_SIZE = Math.max(16, Math.round(screenWidth / 50));

export default function Welcome() {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.94,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = async () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    try {
      await AsyncStorage.setItem("access", "true");
      router.push("/" as Href);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <LinearGradient
      colors={["#0f2027", "#203a43", "#2c5364"]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.glowContainer}>
          <View style={styles.glow} />
          <Image
            source={require("/home/user/weather/weather/assets/images/snow_1164908.png")}
            style={styles.image}
          />
        </View>
        <Text style={[styles.title, { fontSize: TITLE_SIZE }]}>Daily Weather</Text>
        <Text style={[styles.text, { fontSize: TEXT_SIZE }]}>
          Stay ahead of the weather in your city and plan your day with confidence
        </Text>
        <TouchableWithoutFeedback
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <Animated.View style={[styles.button, { transform: [{ scale: scaleValue }] }]}>
            <Text style={styles.buttonText}>Get Started</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 60,
    paddingVertical: 40,
  },
  glowContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  glow: {
    position: "absolute",
    width: IMAGE_SIZE + 20,
    height: IMAGE_SIZE + 10,
    borderRadius: (IMAGE_SIZE + 40) / 2,
    backgroundColor: "white", // White glow background
    opacity: 0.2,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 18,
    elevation: 24,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    resizeMode: "contain",
    zIndex: 1,
  },
  title: {
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 30,
    color: "white",
    textAlign: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#3578e5",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: "50%",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white", // White border
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
});
