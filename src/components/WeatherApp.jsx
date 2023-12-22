import React, { useEffect, useState } from 'react'
import './WeatherApp.css'

import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'
import drizzle_icon from '../assets/drizzle.png'

const WeatherApp =  () => {
    let api_key = "c1d5e007007de47e037733d5899b1602"
    
    const [wicon,setWicon] = useState(cloud_icon)
    const search = async () => {
        const element = document.getElementsByClassName('cityInput')
        if(element[0].value === ''){ return}
        let url =`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
        let response = await fetch(url);

        let data = await response.json();
        console.log(data)
        const humidity = document.getElementsByClassName('humidity-percent');
        const wind = document.getElementsByClassName('wind-rate');
        const temperature = document.getElementsByClassName('weather-temp');
        const location = document.getElementsByClassName('weather-location');

        humidity[0].innerText = data.main.humidity + ' %';
        wind[0].innerText = data.wind.speed + ' km/h';
        temperature[0].innerText = data.main.temp + ' °C';
        location[0].innerText = data.name;

        if(data.weather[0].icon === '01d' || data.weather[0].icon === '01n'){
            setWicon(clear_icon)
        }else if(data.weather[0].icon === '02d' || data.weather[0].icon === '02n'){
            setWicon(cloud_icon)
        } else if(data.weather[0].icon === '03d' || data.weather[0].icon === '03n'){    
            setWicon(drizzle_icon)
        } else if(data.weather[0].icon === '04d' || data.weather[0].icon === '04n'){    
            setWicon(drizzle_icon)
        } else if(data.weather[0].icon === '09d' || data.weather[0].icon === '09n'){    
            setWicon(rain_icon)
        } else if(data.weather[0].icon === '10d' || data.weather[0].icon === '10n'){        
            setWicon(rain_icon)
        }   else if(data.weather[0].icon === '13d' || data.weather[0].icon === '13n'){  
            setWicon(snow_icon)
        } else{
            setWicon(clear_icon)
        }
    }

    const weatherByLocation = async ({latitude,longitude}) => {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=Metric`
        let response = await fetch(url);

        let data = await response.json();
        console.log(data)
        const humidity = document.getElementsByClassName('humidity-percent');
        const wind = document.getElementsByClassName('wind-rate');
        const temperature = document.getElementsByClassName('weather-temp');
        const location = document.getElementsByClassName('weather-location');

        humidity[0].innerText = data.main.humidity + ' %';
        wind[0].innerText = data.wind.speed + ' km/h';
        temperature[0].innerText = data.main.temp + ' °C';
        location[0].innerText = data.name;
    }

 
    useEffect(() => {
        
        

        navigator.geolocation.getCurrentPosition(function (position) {
            // Succès : la position a été obtenue avec succès
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
    
            weatherByLocation({latitude, longitude})
        })
        
    }, [])
    return (
    <div className='container'>
      <div className='top-bar'>
        <input type="text" className="cityInput" placeholder='search' />
        <div className="search-icon" onClick={()=>{search()}}>
            <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">
        15°C
      </div>
      <div className="weather-location">
        London
      </div>
      <div className="data-container">
        <div className="element">
            <img src={humidity_icon} className='icon' alt="" />
            <div className="data">
                <div className="humidity-percent">
                    64%
                </div>
                <div className="text">
                    Humidité
                </div>
            </div>
        </div>

        <div className="element">
            <img src={wind_icon} className='icon' alt="" />
            <div className="data">
                <div className="wind-rate">
                    18 km/h
                </div>
                <div className="text">
                    Vitesse du vent
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp
