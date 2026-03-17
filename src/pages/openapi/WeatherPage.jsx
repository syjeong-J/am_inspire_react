import { useEffect, useState } from 'react';
import WeatherBox from '../../components/openapi/WeatherBox';
import WeatherButton from '../../components/openapi/WeatherButton';
import './css/index.css' ;

const WeatherPage = () => {

    const apikey = process.env.REACT_APP_OPENAPI_KEY ;

    const cities = ["seoul", "busan", "paris", "new york"] ;
    const [city, setCity] = useState('') ;
    const [weather, setWeather] = useState(null) ;

    // 현재 위치(위도, 경도) 정보를 바탕으로 날씨 정보를 얻어온다면?
    const getCurrLoc = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude ;
            let lon = position.coords.longitude ;
            console.log(">>> lat, lon :", lat,lon);
            getCurWeather(lat, lon);
        });
    }

    /* 
    - fetch api 이용해서 데이터를 전달
    - 전달된 데이터를 weather 담는다
    - 디버그 콘솔을 활용하여 weather 정보를 확인해 본다면?
    */

    const getCurWeather = async (lat, lon) => {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`
        
        const response = await fetch(url);
        const data = await response.json();

        console.log(">>> 날씨 데이터 :", data);
        setWeather(data);
    }

    const getCityWeather = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`

        const response = await fetch(url);
        const data = await response.json();

        console.log(">>> 도시 날씨 데이터 :", data);
        setWeather(data);
    }

    const cityHandler = (city) => {
        console.log(">>>> cityHandler city click ",city);
        setCity(city);
    }

    useEffect(() => {
        console.log(">>>> WeatherPage City :", city);
        if( city == '') {
            getCurrLoc();
        } else {    
            getCityWeather();
        }
        },[city]) ;

    return(
        <div className="container">
            <WeatherBox     weather={weather}/>
            <WeatherButton  cities={cities} handler={cityHandler} city={city}/>
            
        </div>
    )
}

export default WeatherPage;