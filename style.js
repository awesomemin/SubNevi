import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  locationStatus: {
    flex: 1,
    borderBottomColor: "black",
    borderBottomWidth: 5,
    paddingHorizontal: 10,
  },
  select: {
    flex: 4,
  },
  currentStation: {
    flex:1,
    justifyContent: "center",
  },
  nextStation: {
    flex:1,
    justifyContent: "center",
  },
  currentStationText: {
    fontSize: 20,
  },
  nextStationText: {
    fontSize: 20,
  }
});