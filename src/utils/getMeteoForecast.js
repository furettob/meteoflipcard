import React, { useState, useEffect } from 'react';

import axios from 'axios'
import staticData from "../staticdata.json"

const getMeteoForecast = async (geolocation) => {

  const simulateAsync = async () => {        
    const delay = ms => new Promise(res => setTimeout(res, ms))
    await delay(2000)
    return staticData
  }

  async function fetchWeatherbitData() {
    let url = "https://api.weatherbit.io/v2.0/forecast/daily?" + 
              "lat=" + geolocation.latitude +
              "&lon=" + geolocation.longitude +
              "&lang=it" +
              "&key=a67878c69b7144b3a21729753360d4a9"

    const weatherbitParams = {
        method: "get",
        url: url,
        headers: {
            "Content-Type": "application/json"
        }
    }
    let weatherbitReturn = await axios(weatherbitParams)
    console.log(JSON.stringify(weatherbitReturn))
    return weatherbitReturn
  }

  async function fakeWeatherbitData() {
    console.log("fakeWeatherbitData")
    let weatherbitReturn = await simulateAsync()
    return weatherbitReturn
  }
  // fetchWeatherbitData()
  return await fakeWeatherbitData()
}

export default getMeteoForecast