import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef } from "react";

const screenWidth = Dimensions.get("window").width;

const MainScreen = ({ navigation }) => {
  const moveAnimation = useRef(new Animated.Value(0)).current;
  const backgroundColorAnimation = useRef(new Animated.Value(0)).current;
  const textOpacityAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(moveAnimation, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundColorAnimation, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
        }),
      ]),
      Animated.timing(textOpacityAnimation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate("Login");
    });
  }, []);
  const backgroundColorInterpolate = backgroundColorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(255,255,255,1)", "#98EECC"],
  });
  const rotateInterpolate = moveAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });
  const moveInterpolate = moveAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, screenWidth],
  });
  return (
    <Animated.View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: backgroundColorInterpolate,
      }}
    >
      <Animated.View
        style={{
          transform: [
            { translateX: moveInterpolate },
            { rotate: rotateInterpolate },
          ],
        }}
      >
        <Image
          source={require("../../assets/pencil.png")}
          style={{ width: 100, height: 100 }}
        />
      </Animated.View>
      <Animated.View
        style={{
          transform: [
            { translateX: moveInterpolate },
            { rotate: rotateInterpolate },
          ],
        }}
      >
        <Image
          source={require("../../assets/book.png")}
          style={{ width: 100, height: 100 }}
        />
      </Animated.View>
      <Animated.Text
        style={{
          fontSize: 30,
          color: "white",
          textAlign: "center",
          alignItems: "center",
          fontWeight: "bold",
          opacity: textOpacityAnimation,
        }}
      >
        BESTLOG
      </Animated.Text>
    </Animated.View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
