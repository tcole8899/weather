import React, {useState, useEffect} from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';

import { CardData } from './WeatherCard/cardData';
import WeatherCard from './WeatherCard'

const LandingContainer = styled.div`
  width: 80%;
  height: 100%;
`;

const WeeklyForecastDiv = styled.div`
  white-space: nowrap;
  min-width: fit-content;
  max-width: 80%;
  height: 500px;
  overflow: scroll;
  margin: 0 auto;
  top: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  position: absolute;
  font-family: Verdana, Arial, sans-serif;
`;

interface LocationData {
    properties: {
      forecast: string,
      forecastHourly: string,
      relativeLocation: {
        properties: {
          city: string,
          state: string,
        }
      }
    }
  }

interface GeoLocationPosition {
  coords: {
    latitude: number,
    longitude: number
  }
}

interface GeoLocationError {
  code: number,
  message: string
}

function Landing() {
  const [location, setLocation] = useState(``);
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState(undefined);

  const getForecasts = useCallback((pos: GeoLocationPosition) => {
    const WEATHER_API = `https://api.weather.gov/points/${pos.coords.latitude},${pos.coords.longitude}`;
    fetch(WEATHER_API)
      .then(response => response.json())
      .then((data: LocationData) => {
        if(data.properties) {
          console.log(data);
          const locData = data.properties.relativeLocation.properties;
          setLocation(`${locData.city}, ${locData.state}`);
          getWeeklyForecast(data.properties.forecast);
          getHourlyForecast(data.properties.forecastHourly);
        }
    });
  }, []);

  const getWeeklyForecast = (weeklyAPI: string) => {
    fetch(weeklyAPI)
      .then(response => response.json())
      .then(data => setWeeklyForecast(data.properties.periods));
  };
  
  const getHourlyForecast = (hourlyAPI: string) => {
    fetch(hourlyAPI)
      .then(response => response.json())
      .then(data => setHourlyForecast(data.properties.periods));
  };

  // Attempt to get the users location
  useEffect(() => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    function error(err: GeoLocationError) {
      console.error(`ERROR(${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(getForecasts, error, options);

  }, [getForecasts]);


  return (
    <LandingContainer>
      <WeeklyForecastDiv>
        {weeklyForecast !== [] ? 
          weeklyForecast.map((day) => <WeatherCard {...day} />) : <WeatherCard {...CardData} />
        }
      </WeeklyForecastDiv>
    </LandingContainer>
  );
}

export default Landing;