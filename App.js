import React from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { useEffect, useState } from 'react';
import { styles } from './style';


export default function App() {
  const [currentStation, setCurrentStation] = useState("loading...");
  const [nextStation, setNextStation] = useState("loading...");

  const getLocationPermission = async () => {
    await Location.requestForegroundPermissionsAsync();
    await Location.requestBackgroundPermissionsAsync();
  }

  const defineTask = () => {
    TaskManager.defineTask("TRACKING_USER_LOCATION", ({ data: {eventType, region}, error }) => {
      if (error) {
        return;
      }
      if (Location.GeofencingEventType.Enter === eventType) {

      } else if (Location.GeofencingEventType.Exit === eventType) {
        
      }
    })
  }

  const trackLocation = async () => {
    defineTask();
    await Location.startGeofencingAsync("TRACKING_USER_LOCATION",)
  }

  useEffect(() => {
    getLocationPermission();
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.locationStatus}>
        <View style={styles.currentStation}>
          <Text style={styles.currentStationText}>현재 역 : {currentStation}</Text>
        </View>
        <View style={styles.nextStation}>
          <Text style={styles.nextStationText}>다음 역 : {nextStation}</Text>
        </View>
      </View>
      <View style={styles.select}>
        
      </View>
    </View>
  );
}