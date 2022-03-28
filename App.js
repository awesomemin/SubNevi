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
  const [isStarted, setIsStarted] = useState(false);
  const [isStop, setIsStop] = useState(true);
  const [currentStation, setCurrentStation] = useState("");
  const [movingPrevStation, setMovingPrevStation] = useState("");
  const [movingNextStation, setMovingNextStation] = useState("");
  const [isUpper, setIsUpper] = useState();

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
      setIsStarted(true);
      setIsStop(true);
      setCurrentStation(region.identifier);
    } else if (Location.GeofencingEventType.Exit === eventType) {
      setIsStop(false);
      setMovingPrevStation(currentStation);
      stationRegions.forEach((value, index) => {
        if(currentStation === value.identifier) {
          setMovingNextStation(stationRegions[index+1]);
        }
      })

    }
  })

  const trackLocation = async () => {
    await Location.startGeofencingAsync("TRACKING_USER_LOCATION", stationRegions);
  }

  useEffect(() => {
    getLocationPermission();
    trackLocation();
    stationRegions.forEach((value, index) => {
      if(currentStation)
      console.log(value.identifier);
    })
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.locationStatus}>
        {isStarted ? (isStop ? (
          <Text style={styles.currentStationText}>{currentStation}에 정차 중입니다. </Text>
        ) : (
          <View style={styles.movingStatusIndicator}>
            <View>
              <Text style={styles.movingStationText}>{movingPrevStation}</Text>
            </View>
            <View>
              <Entypo name="arrow-long-right" size={36} color="black" />
            </View>
            <View>
              <Text style={styles.movingStationText}>{movingNextStation}</Text>
            </View>
          </View>
        )) : (<Text style={styles.announceText}>다음 정차역부터 정상 작동합니다.</Text>)}
      </View>
      <View style={styles.select}>
      </View>
    </View>
  );
}