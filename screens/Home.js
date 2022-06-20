import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class HomeScreen extends Component {
    render(){
        return(
            <View style ={styles.container}>
                <Text> Tela Inicial </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#aff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });