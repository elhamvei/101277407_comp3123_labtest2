import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import './App.css';
import { BsSun, BsCloudFog, BsCloud, BsCloudHaze } from "react-icons/bs";

const ApiKey = '05611fe9ea1010a14e85163bd7a77513';
const cityName = "Toronto";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentDate, stCurrentDate] = useState('');
  const [city, setCity] = useState(cityName);
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const getData = async () => {
    setIsLoaded(false);
    const Response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ApiKey}`);
    console.log('Response',Response);
    const data = Response.data;
    setData(data);
    const d  = new Date();
    const dateString = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

    stCurrentDate(dateString);
    setIsLoaded(true);
  };
  useEffect(() => {
    getData();
  }, [city]);

  const getWeatherImage = () =>{
    switch(data.weather[0].main){
      case "Fog":
        return "";
      case "Clouds":
        return "";
      case "Clouds":
        return "";
      case "Clouds":
        return "";
                    

    }
  }

  const getIcon = () =>{
    switch(data.weather[0].main){
      case 'Fog':
        return <BsCloudFog/>
      case 'Clouds':
        return <BsCloud />
      case 'Clear':
        return <BsSun />
      case 'Haze':
        return <BsCloudHaze />
      default:
        return <BsCloudFog />
    }
  }

  return (
    <div className="container-fluid px-1 px-sm-3 py-5 mx-auto">
      {isLoaded ?
        <div className="row d-flex justify-content-center">
          <div className="row card0">
            <div className="card1 col-lg-8 col-md-7">
              <small>Elham Veisouei - 101277407</small>
              <div className="text-center">
                <img className="image mt-5" src="https://i.imgur.com/M8VyA2h.png" />
              </div>
              <div className="row px-3 mt-3 mb-3">
                <h1 className="large-font mr-3">{Math.round(data.main.temp)}°</h1>
                <div className="d-flex flex-column mr-3">
                  <h2 className="mt-3 mb-0">{city}</h2>
                  <small>{currentDate}</small>
                </div>
                <div className="d-flex flex-column text-center">
                  <h3 className='d-weather-icon'>{getIcon()}</h3>
                  <small>{data.weather[0].main}</small>
                </div>
              </div>
            </div>
            <div className="card2 col-lg-4 col-md-5">
              <div className="row px-3">
                <input type="text" name="location" placeholder="Another location" className="mb-5" value={searchText} 
                  onChange={e => setSearchText(e.target.value)} />
                <div className="fa fa-search mb-5 mr-0 text-center" onClick={()=>{
                  if(searchText.length>0){
                    console.log('>',searchText);
                    getData(searchText);
                  }
                }} />
              </div>
              <div className="mr-5">
                <p className="light-text suggestion" onClick={()=>setCity('Toronto')}>Toronto</p>
                <p className="light-text suggestion" onClick={()=>setCity('Tehran')}>Tehran</p>
                <p className="light-text suggestion" onClick={()=>setCity('Dubi')}>Dubi</p>
                <p className="light-text suggestion" onClick={()=>setCity('Vancouver')}>Vancouver</p>
                <div className="line my-5" />
                <p>Weather Details</p>
                <div className="row px-3">
                  <p className="light-text">Cloudy</p>
                  <p className="ml-auto">{100-Math.round(data.clouds.all)}%</p>
                </div>
                <div className="row px-3">
                  <p className="light-text">Humidity</p>
                  <p className="ml-auto">{Math.round(data.main.humidity)}%</p>
                </div>
                <div className="row px-3">
                  <p className="light-text">Wind</p>
                  <p className="ml-auto">{Math.round(data.wind.speed)}km/h</p>
                </div>
                <div className="row px-3">
                  <p className="light-text">Pressure</p>
                  <p className="ml-auto">{data.main.pressure}hPa</p>
                </div>
                <div className="line mt-3" />
              </div>
            </div>
          </div>
        </div>
        :
        <Spinner animation="grow" variant="primary" />
        }
  </div>
  );
}

export default App;
