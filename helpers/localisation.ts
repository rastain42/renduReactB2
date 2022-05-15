import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export function geolocFinder() {
    
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    
    var [latitude, setLatitude] = useState(null);
    var [longitude, setLongitude] = useState(null);
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);
  
    latitude = 'latitude..';
    longitude = 'longitude..';
  
    if (errorMsg) {
      latitude = errorMsg;
      longitude = errorMsg;
  
    } else if (location) {
      latitude = location.coords.latitude;
      longitude = location.coords.longitude;
    }  

    return {latitude:latitude,longitude:longitude}
  }
