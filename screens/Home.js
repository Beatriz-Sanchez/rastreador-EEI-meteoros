import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';

export default class HomeScreen extends Component {
    render(){
        return(
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea}>
                    <View style={styles.titleBar}>
                        <Text style={styles.titleText}> App Reastreador de EEI </Text>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    titleText: {
        fontSize: 40,
        fontWeight: "bold",
        color: "white"
    },
    droidSafeArea:{
        marginTop: Platform.OS === "android"? StatusBar.currentHeight : 0,
    },
    titleBar: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
  });