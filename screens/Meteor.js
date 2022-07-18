import React, { Component } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Text, View, StyleSheet, SafeAreaView, Platform } from "react-native";
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
      speed = require("../assets/meteor_speed3.gif");
      size = 100;
    } else if (meteor.threat_score <= 75) {
      bg_img = require("../assets/meteor_bg2.png");
      speed = require("../assets/meteor_speed3.gif");
      size = 150;
    } else {
      bg_img = require("../assets/meteor_bg3.png");
      speed = require("../assets/meteor_speed3.gif");
      size = 200;
    }
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
});
