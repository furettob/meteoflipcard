import {useState, useEffect} from 'react';

const useGeolocation = () => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);
  
  const onPositionChanged = ({coords}) => {
    console.log("PREV POSITION", this.position)

    const prevLatitude = isNaN(parseFloat(position.latitude)) ?
                undefined :
                parseFloat(position.latitude).toFixed(4)
    const prevLongitude = isNaN(parseFloat(position.longitude)) ?
                undefined :
                parseFloat(position.longitude).toFixed(4)
    const latitude = isNaN(parseFloat(coords.latitude)) ?
                undefined :
                parseFloat(coords.latitude).toFixed(4)
    const longitude = isNaN(parseFloat(coords.longitude)) ?
                undefined :
                parseFloat(coords.longitude).toFixed(4)
 
    if (
      latitude && longitude &&
      (prevLatitude !== latitude || prevLongitude !== longitude)
    ) {
      console.log("SIGNIFICANT changed to: " + latitude + " - " + longitude + "\nfrom: " + prevLatitude + " - " + prevLongitude)
      setPosition({
        latitude: latitude,
        longitude: longitude,
      });
      setError(null)
    }
  };

  const onErrorReceived = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported');
      return;
    } 
    const watcher = navigator.geolocation.watchPosition(onPositionChanged, onErrorReceived);
    return () => navigator.geolocation.clearWatch(watcher);
  }, []);
  return {...position, error};
}

export default useGeolocation