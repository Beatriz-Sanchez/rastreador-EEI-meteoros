import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
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

  render() {
    if (Object.keys(this.state.meteors).length === 0) {
      return (
        <View style={styles.container}>
          <Text> Carregando... </Text>
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
      return (
        <View style={styles.container}>
          <Text> Há {meteors.length} meteoros passando perto da terra esta semana!</Text>
          <Text> </Text>
          <Text> {meteors[0].name} </Text>
          <Text> {meteors[0].threat_score} </Text>
          <Text> </Text>
          <Text> {meteors[1].name} </Text>
          <Text> {meteors[1].threat_score} </Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffa",
    alignItems: "center",
    justifyContent: "center",
  },
});
