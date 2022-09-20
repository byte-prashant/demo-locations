import React, { useEffect } from "react";
import { useGeolocated } from "react-geolocated";

import "./geoLocation.css";

function GeoLocation(props) {
  const { setLong, setLat, setmarrkersLonlat, setCenter} = props;
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  // const { latitude, longitude } = coords;
  // console.log("latitude", latitude, longitude);
  useEffect(() => {
    coords?.longitude > 0 && setLong(coords?.longitude);
    coords?.latitude > 0 && setLat(coords?.latitude);
    setmarrkersLonlat([[[coords?.longitude,coords?.latitude],"my loc"]]);
    setCenter([coords?.longitude,coords?.latitude]);
  }, [coords]);
  
  // if (isGeolocationAvailable && isGeolocationEnabled && coords) {

  // }

  return !isGeolocationAvailable ? (
    <div>Your browser does not support Geolocation</div>
  ) : !isGeolocationEnabled ? (
    <div>Geolocation is not enabled</div>
  ) : coords ? (<></>
  ) : (
    <div>Getting the location data & hell ip </div>
  );
}

export default GeoLocation;