import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from '@mantine/core'
import { BsArrowDown, BsArrowDownLeft, BsArrowDownRight, BsArrowLeft, BsArrowRight, BsArrowUp, BsArrowUpLeft, BsArrowUpRight } from 'react-icons/bs'

function App() {

  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState('Heidenheim')
  const [countryCode, setCountryCode] = ('DE')

  useEffect(() => {
    getWeather()
  }, [])
  
  async function getWeather () {
    const res = await getGeocode()
    console.log(res)
    const { lat, lon } = res.data[0]
    const { data: { weather, main, wind, visibility }} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.REACT_APP_OPENWEATHERAPIKEY}`)
    setWeather({ weather, main, wind, visibility })
  }
  
  function getGeocode () {
    return axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${countryCode}&limit=1&appid=${process.env.REACT_APP_OPENWEATHERAPIKEY}`)
  }

  function getDirection (degree) {
    console.log(degree)
    console.log(Math.round(degree / 45) * 45)
    switch (Math.round(degree / 45) * 45) {
      case (0):
        return <BsArrowDown />
      case (45):
        return <BsArrowDownLeft />
      case (90):
        return <BsArrowLeft />
      case (135):
        return <BsArrowUpLeft />
      case (180):
        return <BsArrowUp />
      case (225):
        return <BsArrowUpRight />
      case (270):
        return <BsArrowRight />
      case (315):
        return <BsArrowDownRight />
      default:
        return <BsArrowDown />
    }
    
  }
  
  return (
    <div className="App">
      <Container>
        <h2>Weather in { city }</h2>
        <img src={`https://openweathermap.org/img/wn/${weather && weather?.weather[0].icon}@4x.png`} />
        <h2 style={{margin: 0}}>{ weather && weather?.weather[0].description }</h2>
        <h1>{ Math.round(weather?.main.temp) } °F</h1>
        <div>
          <h4 style={{margin: '5px'}}>Feels Like: { Math.round(weather?.main.feels_like)} °F</h4>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '50px'}}>
          <div>
            <h3>Pressure</h3>
            <h4>{ Math.round(weather?.main.pressure)} hPa</h4>
          </div>
          <div>
            <h3>Humidity</h3>
            <h4>{ Math.round(weather?.main.humidity)}%</h4>
          </div>
          <div>
            <h3>Wind</h3>
            <h4 style={{margin: 0}}>{ Math.round(weather?.wind.speed)} mph</h4>
            <h3 style={{margin: 0}}>{getDirection(weather?.wind.deg)}</h3>
          </div>
          <div>
            <h3>Visibility</h3>
            <h4>{ Math.round(weather?.visibility / 1000)} km</h4>
          </div>
        </div>
        {/* <p><pre>{ JSON.stringify(weather) }</pre></p> */}
      </Container>
    </div>
  );
}

export default App;
