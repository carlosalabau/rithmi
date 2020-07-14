import * as React from "react";
import { Button, StyleSheet, Dimensions, View } from "react-native";

export default function home({ navigation }) {
    const screenWidth = Dimensions.get("window").width;

    const styles = StyleSheet.create({
        buttons: {
      display: "flex",
      justifyContent: "space-around",
      flexDirection: "row",
      marginTop: 20,
    },
    button:{
        width:screenWidth / 2.2,
    }
  });
  return (
    <View style={styles.buttons}>
      <Button
        style={styles.button}
        title="Graphic"
        onPress={() => navigation.navigate("Graphic")}
      />
      <Button
        style={styles.button}
        title="History"
        onPress={() => navigation.navigate("History")}
      />
    </View>
  );
}
