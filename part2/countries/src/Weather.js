import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState();

    useEffect(() => {
        axios
            .get(
                `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_WEATHER_API}`
            )
            .then((res) => {
                console.log("incoming weather data", res.data);
                setWeather(res.data);
            });
    }, []);

    const convertFromKelvinToCelsius = (temp) => {
        return Number(temp - 273.15).toFixed(2);
    };

    const titleCaseSentence = (sentence) => {
        return sentence.charAt(0).toUpperCase() + sentence.slice(1);
    };

    return (
        <>
            {weather && (
                <div>
                    <h3>Weather</h3>
                    <div>
                        Conditions:{" "}
                        {titleCaseSentence(weather.weather[0].description)}
                    </div>
                    <div>
                        Temperature:{" "}
                        {convertFromKelvinToCelsius(weather.main.temp)} C&deg;
                    </div>
                    <div>
                        Wind (speed, direction): {weather.wind.speed} m/sec,{" "}
                        {weather.wind.deg}&deg;
                    </div>
                </div>
            )}
        </>
    );
};

export default Weather;
