import React, { useState } from "react";
import axios from "axios";

export default function WeatherSearch() {
    const [city, setCity] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [weather, setWeather] = useState({});

    function displayWeather(response) {
        setLoaded(true);
        setWeather({
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            wind: response.data.wind.speed,
            humidity: response.data.main.humidity,
            icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        let apiKey = "b2e30f7ef0386c960ef0424843922ae9";
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        axios.get(url).then(displayWeather);
    }
    function updateCity(event) {
        setCity(event.target.value);
    }
    let form = <form onSubmit={handleSubmit}>
        <input type="search" placeholder="Type a city..." onChange={updateCity} />
        <input type="submit" value="Search" />
    </form>;
    if (loaded) {
        return (
            <div>
                {form}
                <ul>
                    <li>temperature: {Math.round(weather.temperature)} ˚C</li>
                    <li>{weather.description}</li>
                    <li>wind speed: {weather.wind} km/h</li>
                    <li>humidity: {weather.humidity}%</li>
                    <li>
                        <img src={weather.icon} alt={weather.description} />
                    </li>
                </ul>
            </div>
        )
    }
    else
        return form;

}