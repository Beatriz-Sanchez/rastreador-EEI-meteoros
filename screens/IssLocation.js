import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class ISSTrackerScreen extends Component {
    render(){
        return(
            <View style ={styles.container}>
                <Text> Tela de Rasteador de ISS </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#faf',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });