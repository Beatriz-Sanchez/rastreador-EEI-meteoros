import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import HomeScreen from './screens/Home';
import ISSTrackerScreen from './screens/IssLocation';
import MeteorScreen from './screens/Meteor';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="IssLocation" component={ISSTrackerScreen}/>
        <Stack.Screen name="Meteors" component={MeteorScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
