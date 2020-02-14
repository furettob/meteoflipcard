import React from 'react'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import { Marker } from "react-google-maps"
import useGeolocation from './useGeo'

const MapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDgFl8bN5Qmcf4bLbmDdUo10-dTy2G4YN0&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `240px` }} />,
    containerElement: <div style={{ height: `240px` }} />,
    mapElement: <div className="map-element" style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)( (props) => {
  const geolocation = props.geolocation || useGeolocation()

  function getCenter() {
    console.log("Building a map of:" + geolocation.latitude + " - " + geolocation.longitude)
    return { lat: geolocation.latitude, lng:geolocation.longitude };
  }

  if (!geolocation || isNaN(geolocation.latitude) || isNaN(geolocation.longitude)) {
    return <div>No geolocation yet ...</div>
  }

  return <GoogleMap
    defaultOptions={{
      minZoom: 14,
      maxZoom: 14,
      fullscreenControl: false,
      zoomControl: false,
      streetViewControl: false,
      scaleControl: false,
      mapTypeControl: false
    }}
    defaultZoom={14}
    defaultCenter={ getCenter() }
    center={ getCenter()}
    >
    <Marker className={"ft_gm "}
            position={ getCenter() }
    />
  </GoogleMap>}
)

export default MapComponent