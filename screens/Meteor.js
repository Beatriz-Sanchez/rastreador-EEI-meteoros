import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  Image,
  ImageBackground,
  FlatList,
  Dimensions,
} from "react-native";
import axios from "axios";

export default class MeteorScreen extends Component {
  constructor() {
    super();
    this.state = {
      meteors: {},
    };
  }
  getMeteores = async () => {
    try {
      let response = await axios.get(
        "https://api.nasa.gov/neo/rest/v1/feed?api_key=FF5YDCmGg6ZHo2yOCkiHXqSGnq5WkiupCxuoQuTA"
      );
      this.setState({ meteors: response.data.near_earth_objects });
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  componentDidMount() {
    this.getMeteores();
  }

  renderItem = ({ item }) => {
    let meteor = item;
    let bg_img, speed, size;
    if (meteor.threat_score <= 30) {
      bg_img = require("../assets/meteor_bg1.png");
      speed = require("../assets/meteor_speed1.gif");
      size = 100;
    } else if (meteor.threat_score <= 75) {
      bg_img = require("../assets/meteor_bg2.png");
      speed = require("../assets/meteor_speed2.gif");
      size = 150;
    } else {
      bg_img = require("../assets/meteor_bg3.png");
      speed = require("../assets/meteor_speed3.gif");
      size = 200;
    }
    return (
      <ImageBackground source={bg_img} style={styles.backgroundImage}>
        <View style={styles.gifContainer}>
          <Image
            source={speed}
            style={{ width: size, height: size, alignSelf: "center" }}
          />
          <View style={styles.meteorDataContainer}>
            <Text
              style={[styles.cardTitle, { marginTop: 400, marginLeft: 50 }]}
            >
              {item.name}
            </Text>
            <Text style={[styles.cardText, { marginTop: 20, marginLeft: 50 }]}>
              Mais Próximo da Terra -{" "}
              {item.close_approach_data[0].close_approach_date_full}
            </Text>
            <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
              Diâmetro Mínimo (KM) -{" "}
              {item.estimated_diameter.kilometers.estimated_diameter_min}
            </Text>
            <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
              Diâmetro Máximo (KM) -{" "}
              {item.estimated_diameter.kilometers.estimated_diameter_max}
            </Text>
            <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
              Velocidade (KM/H) -{" "}
              {
                item.close_approach_data[0].relative_velocity
                  .kilometers_per_hour
              }
            </Text>
            <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
              Distância da Terra (KM) -{" "}
              {item.close_approach_data[0].miss_distance.kilometers}
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  };

  render() {
    if (Object.keys(this.state.meteors).length === 0) {
      return (
        <View style={styles.container}>
          <Text style={{ color: "white" }}> Carregando... </Text>
        </View>
      );
    } else {
      let meteor_arr = Object.keys(this.state.meteors).map((meteor_date) => {
        return this.state.meteors[meteor_date];
      });
      let meteors = [].concat.apply([], meteor_arr);
      meteors.forEach((element) => {
        let diameter =
          (element.estimated_diameter.kilometers.estimated_diameter_min +
            element.estimated_diameter.kilometers.estimated_diameter_min) /
          2;
        let distance = element.close_approach_data[0].miss_distance.kilometers;
        let threatScore = (diameter / distance) * 1000000000;
        element.threat_score = threatScore;
      });
      meteors.sort((a, b) => {
        return b.threat_score - a.threat_score;
      });
      meteors = meteors.slice(0, 5);
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={meteors}
            renderItem={this.renderItem}
            horizontal={true}
            initialNumToRender={5}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: "white",
  },
  cardText: {
    color: "white",
  },
  gifContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginVertical: 20,
  },
  meteorDataContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
