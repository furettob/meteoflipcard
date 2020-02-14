import React, {Component} from 'react'
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
    const geolocation = useGeolocation()
    const allProps = Object.assign({}, {...props}, {geolocation})
    return <GoogleMapComponent {...allProps}/>
  }
)

class GoogleMapComponent extends Component {

  getCenter = () => {
    if (!this.props.geolocation) {
      return undefined
    }
    return { lat: this.props.geolocation.latitude, lng: this.props.geolocation.longitude };
  }

  componentDidUpdate = async (prevProps) => {
    const prevLatitude = prevProps.geolocation ?
              isNaN(parseFloat(prevProps.geolocation.latitude)) ?
                undefined :
                parseFloat(prevProps.geolocation.latitude).toFixed(4)
              : undefined
    const prevLongitude = prevProps.geolocation ?
              isNaN(parseFloat(prevProps.geolocation.longitude)) ?
                undefined :
                parseFloat(prevProps.geolocation.longitude).toFixed(4)
              : undefined

    const latitude = this.props.geolocation ?
              isNaN(parseFloat(this.props.geolocation.latitude)) ?
                undefined :
                parseFloat(this.props.geolocation.latitude).toFixed(4)
              : undefined
    const longitude = this.props.geolocation ?
              isNaN(parseFloat(this.props.geolocation.longitude)) ?
                undefined :
                parseFloat(this.props.geolocation.longitude).toFixed(4)
              : undefined

    if (
        latitude && longitude &&
        (prevLatitude !== latitude || prevLongitude !== longitude)
      ) {
        console.log("MAP PREV: " + prevLatitude + " - " + prevLongitude)
        console.log("MAP THIS: " + latitude + " - " + longitude)
        this.setState({center:this.getCenter()})
    }
  }

  render() {
    if (!this.state || !this.state.center) {
      console.log("Returning NO MAP")
      return <div>No geolocation yet ...</div>
    }

    console.log("MAP")

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
      defaultCenter={ this.state.center }
      center={ this.getCenter()}
      >
      <Marker className={"ft_gm "}
              position={ this.state.center }
      />
    </GoogleMap>
  }
}

export default MapComponent