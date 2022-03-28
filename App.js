import React from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { useEffect, useState } from 'react';
import { styles } from './style';
import { stationRegions } from "./stations";
import { Entypo } from "@expo/vector-icons";


export default function App() {
  const [isStop, setIsStop] = useState(true);
  const [currentStation, setCurrentStation] = useState("화곡역");

  const getLocationPermission = async () => {
    await Location.requestForegroundPermissionsAsync();
    await Location.requestBackgroundPermissionsAsync();
  }

  TaskManager.defineTask("TRACKING_USER_LOCATION", ({ data: {eventType, region}, error }) => {
    if (error) {
      console.log(error);
      return;
    }
    if (Location.GeofencingEventType.Enter === eventType) {
      
    } else if (Location.GeofencingEventType.Exit === eventType) {
      
    }
  })

  const trackLocation = async () => {
    await Location.startGeofencingAsync("TRACKING_USER_LOCATION", stationRegions);
  }

  useEffect(() => {
    getLocationPermission();
    trackLocation();
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.locationStatus}>
        {isStop ? (
          <Text style={styles.currentStationText}>{currentStation}에 정차 중입니다. </Text>
        ) : (
          <View style={styles.movingStatusIndicator}>
            <View>
              <Text style={styles.movingStationText}>화곡역</Text>
            </View>
            <View>
              <Entypo name="arrow-long-right" size={36} color="black" />
            </View>
            <View>
              <Text style={styles.movingStationText}>까치산역</Text>
            </View>
          </View>
        )}
      </View>
      <View style={styles.select}>
        
      </View>
    </View>
  );
}