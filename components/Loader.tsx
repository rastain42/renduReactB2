import React from "react";
import { StyleSheet, View } from "react-native";
import { LottieLoader } from "lottie-loader-react-native";

export default function Loader() {
  return (
    <View style={styles.container}>
      <LottieLoader
        visible={true}
        source={require("../assets/loader1.json")}
        animationStyle={styles.lottie}
        speed={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    height: 700,
    marginTop: 100,
 },
  lottie: { flex: 1, flexDirection: 'column', width: 20, height: 20 },
});