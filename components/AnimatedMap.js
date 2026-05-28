import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View, Text } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";

const COUNTRIES = {
  portugal: { name: "🇵🇹 Portugal", lat: 39.4, lng: -8.2 },
  spain: { name: "🇪🇸 Spain", lat: 40.4, lng: -3.7 },
  france: { name: "🇫🇷 France", lat: 46.2, lng: 2.2 },
  italy: { name: "🇮🇹 Italy", lat: 41.9, lng: 12.5 },
  germany: { name: "🇩🇪 Germany", lat: 51.2, lng: 10.5 },
  uk: { name: "🇬🇧 UK", lat: 55.4, lng: -3.4 },
  sweden: { name: "🇸🇪 Sweden", lat: 60.1, lng: 18.6 },
  poland: { name: "🇵🇱 Poland", lat: 51.9, lng: 19.1 },
  greece: { name: "🇬🇷 Greece", lat: 39.1, lng: 21.8 },
  netherlands: { name: "🇳🇱 Netherlands", lat: 52.1, lng: 5.3 },
  belgium: { name: "🇧🇪 Belgium", lat: 50.5, lng: 4.5 },
  austria: { name: "🇦🇹 Austria", lat: 47.5, lng: 14.6 },
  switzerland: { name: "🇨🇭 Switzerland", lat: 46.8, lng: 8.2 },
  romania: { name: "🇷🇴 Romania", lat: 45.9, lng: 24.9 },
  turkey: { name: "🇹🇷 Turkey", lat: 39.0, lng: 35.2 },
};

const generateRoute = (start, end, points = 50) => {
  const route = [];
  for (let i = 0; i <= points; i++) {
    const t = i / points;
    const lat = start.lat + (end.lat - start.lat) * t;
    const lng = start.lng + (end.lng - start.lng) * t;
    route.push({ latitude: lat, longitude: lng });
  }
  return route;
};

export default function AnimatedMap({ destination = "france" }) {
  const animationRef = useRef(new Animated.Value(0)).current;
  const mapRef = useRef(null);
  const [vehiclePosition, setVehiclePosition] = useState({
    latitude: COUNTRIES.portugal.lat,
    longitude: COUNTRIES.portugal.lng,
  });

  const destinationCountry = COUNTRIES[destination] || COUNTRIES.france;
  const route = generateRoute(COUNTRIES.portugal, destinationCountry, 100);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(animationRef, {
        toValue: 1,
        duration: 6000,
        useNativeDriver: false,
      })
    );

    animation.start();

    const listener = animationRef.addListener(({ value }) => {
      const index = Math.floor(value * (route.length - 1));
      setVehiclePosition(route[index]);
    });

    return () => {
      animation.stop();
      animationRef.removeListener(listener);
    };
  }, [destination, animationRef, route]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(route, {
        edgePadding: { top: 100, right: 50, bottom: 100, left: 50 },
        animated: false,
      });
    }
  }, [route]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 48,
          longitude: 8,
          latitudeDelta: 30,
          longitudeDelta: 30,
        }}
        mapType="standard"
      >
        <Polyline
          coordinates={route}
          strokeColor="#FF6B6B"
          strokeWidth={3}
          lineDashPattern={[5, 5]}
        />

        <Marker
          coordinate={COUNTRIES.portugal}
          title="Start"
          pinColor="green"
        />

        <Marker
          coordinate={destinationCountry}
          title={destinationCountry.name}
          pinColor="red"
        />

        <Marker
          coordinate={vehiclePosition}
          title="Vehicle"
          pinColor="gold"
        >
          <View style={styles.vehicleMarker}>
            <Text style={styles.vehicleEmoji}>✈️</Text>
          </View>
        </Marker>
      </MapView>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Destination</Text>
        <Text style={styles.infoDestination}>{destinationCountry.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070707",
  },
  map: {
    flex: 1,
  },
  vehicleMarker: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  vehicleEmoji: {
    fontSize: 24,
  },
  infoBox: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  infoTitle: {
    color: "#FFF1CD",
    fontSize: 12,
    fontWeight: "bold",
  },
  infoDestination: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },
});

