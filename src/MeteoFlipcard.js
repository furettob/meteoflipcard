import React from 'react';
import Flipcard from './Flipcard';
import MeteoWeek from './MeteoWeek';
import MapComponent from './MapComponent';

import useGeolocationStatus from './useGeo'

function MeteoFlipcard() {
	const geolocation = useGeolocationStatus()

	return (
	    <Flipcard>
      		<div>
				<MeteoWeek geolocation={geolocation} />	
			</div>
			<div>
			    <MapComponent geolocation={geolocation}/>
			</div>
      	</Flipcard>
	);
}

export default MeteoFlipcard;
