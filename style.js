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
    justifyContent: "center",
  },
  select: {
    flex: 4,
  },
  currentStationText: {
    fontSize: 20,
    textAlign: "center",
  },
  movingStatusIndicator: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  movingStationText: {
    fontSize: 20,
  }
});