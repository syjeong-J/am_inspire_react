
/*
현재위치, 섭씨, 화씨, 날씨
*/

const WeatherBox = ({weather}) => {
    return (
        <div className="weather-box">
            {/* weather가 undefined가 아니면 name 출력 */}
            <div>{weather?.sys?.country}</div> 
            <div>{weather?.name}</div> 
            <div>{weather?.main?.temp}</div>
            <div>{weather?.weather[0]?.main}</div>
            <div>{weather?.weather[0]?.description}</div>
        </div>
    )
}

export default WeatherBox ;