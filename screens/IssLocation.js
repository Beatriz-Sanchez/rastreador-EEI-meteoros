import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, StatusBar, SafeAreaView, Platform, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps'

export default class ISSTrackerScreen extends Component {
    render(){
        return(
            <View style ={styles.container}>
                <SafeAreaView styles={styles.droidSafeArea}/>
                <ImageBackground source={require('../assets/iss_bg.jpg')} style={styles.backgroundImage}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Localização da EEI</Text>
                    </View>
                    <View style={styles.mapContainer}>
                        <MapView
                        style={styles.map}
                                region={{
                                    latitude: -23,
                                    longitude: -56,
                                    latitudeDelta: 50,
                                    longitudeDelta: 60
                                }}
                        >
                            <Marker
                                    coordinate={{ latitude: -23, longitude: -56 }}
                                >
                                    <Image source={require('../assets/iss_icon.png')} style={{ height: 50, width: 50 }} />
                                </Marker>
                        </MapView>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"black"
    },
    droidSafeArea: {
       marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    titleContainer: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    mapContainer: {
        flex: 0.7
    },
    map: {
        width: "100%",
        height: "100%"
    },
    infoContainer: {
        flex: 0.2,
        backgroundColor: 'white',
        marginTop: -10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30
    },
    infoText: {
        fontSize: 15,
        color: "black",
        fontWeight: "bold"
    }
})