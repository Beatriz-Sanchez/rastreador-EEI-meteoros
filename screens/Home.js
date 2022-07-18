import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <ImageBackground
          source={require("../assets/bg_image.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.titleBar}>
            <Text style={styles.titleText}> App Rastreador de EEI </Text>
          </View>
          <TouchableOpacity style={styles.routeCard} onPress={()=> this.props.navigation.navigate("IssLocation")}>
            <Text style={styles.routeText}>Localização da EEI</Text>
            <Text style={styles.knowMore}> {"Saiba mais --->"} </Text>
            <Text style={styles.bgDigit}>1</Text>
            <Image
              source={require("../assets/iss_icon.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.routeCard} onPress={()=> this.props.navigation.navigate("Meteors")}>
            <Text style={styles.routeText}>Meteoros</Text>
            <Text style={styles.knowMore}> {"Saiba mais --->"} </Text>
            <Text style={styles.bgDigit}>2</Text>
            <Image
              source={require("../assets/meteor_icon.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  titleBar: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  routeCard: {
    flex: 0.25,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
    borderRadius: 30,
    backgroundColor: "white",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  routeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginTop: 75,
    paddingLeft: 30,
  },
  knowMore: {
    paddingLeft: 30,
    color: "red",
    fontSize: 15,
  },
  bgDigit: {
    position: "absolute",
    color: "rgba(183, 183, 183, 0.5)",
    fontSize: 150,
    right: 20,
    bottom: -15,
    zIndex: -1,
  },
  iconImage: {
    position: "absolute",
    height: 200,
    width: 200,
    resizeMode: "contain",
    right: 20,
    top: -80,
  },
});
