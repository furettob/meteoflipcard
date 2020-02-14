import React, {Component} from 'react';
import axios from 'axios'

const INITIAL_STATE = {
	selected: 0
}

class MeteoWeek extends Component {

	componentDidMount = async () => {
		console.log("GEO: ", this.props)
		if (this.props.meteoForecast) {
			this.setState({meteoForecast: this.props.meteoForecast})
			return
		}
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
	  		console.log("PREV: " + prevLatitude + " - " + prevLongitude)
	  		console.log("THIS: " + latitude + " - " + longitude)
	    	let url = "https://api.weatherbit.io/v2.0/forecast/daily" + 
              "?lat=" + latitude +
              "&lon=" + longitude +
              "&lang=it" +
              "&key=a67878c69b7144b3a21729753360d4a9"

		    const weatherbitParams = {
		        method: "get",
		        url: url
		    }

		    let weatherbitReturn = await axios(weatherbitParams)
		    console.log("calleeeeeeed")

			this.setState({meteoForecast: weatherbitReturn}, () => { console.log("Setstate callback: ", this.state) })
		}
	}

	render() {
		if (!this.props.geolocation.latitude || !this.props.geolocation.longitude) {
			return <div>ciao</div>
		}

		console.log("Render with: ", this.state)
		const meteoText = this.state && this.state.meteoForecast ? this.state.meteoForecast.data.data[0].weather.description : "---"

		return <div>{JSON.stringify(this.props.geolocation)}<p>{meteoText}</p></div>
	}
}

export default MeteoWeek