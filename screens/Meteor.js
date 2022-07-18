import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import axios from 'axios';

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

  componentDidMount(){
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
        return (
            <View style={styles.container}>
              <Text> Chamada realizada! </Text>
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
