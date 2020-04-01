import React, { useState, useEffect } from 'react';
import { ScrollView, Platform, StyleSheet, Text, View } from 'react-native';
import DataService from './src/services/DataService';

const data = new DataService();

export default function App() {
const [city, setCity] = useState('');
const [location, setLocation] = useState({});
const [forecast, setForecast] = useState({})

useEffect(() => {
  data.getAllData()
    .then(data => {
      setCity(data.city);
      setLocation(data.location);
      // setForecast(data.forecast);
      return data.city;
    })
}, [])
  return (
    <ScrollView style={{flex: 1, flexDirection: 'column', backgroundColor: '#fde2e2'}}>
      <Text style={{
        padding: 35, backgroundColor: '#679b9b',
        fontFamily: 'sans-serif-light', fontSize: 24}}>City: {city}</Text>
      <Text style={styles.textStyles}>Lat: {location.lat}</Text>
      <Text style={styles.textStyles}>Lng: {location.lng}</Text>
      <Text style={{
        padding: 35, backgroundColor: '#fde2e2',
        fontFamily: 'sans-serif-light', fontSize: 24}}>Temp: {Object.keys(forecast)} C</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textStyles: {
    padding: 35,
    backgroundColor: '#aacfcf',
    fontFamily: 'sans-serif-light',
    fontSize: 24
  }
})