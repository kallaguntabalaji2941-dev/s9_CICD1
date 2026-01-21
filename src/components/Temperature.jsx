import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../components/styles.css";

const Temperature = () => {

    const [city, setCity] = useState("");
    const [temp, setTemp] = useState(null);
    const [error, setError] = useState("");

    const getTemperature = () => {
        if (city.trim() === "") {
            setError("Please enter a city name");
            return;
        }

        setError("");
        setTemp(null);

        // Step 1: City → Latitude & Longitude
        axios.get(
            "https://geocoding-api.open-meteo.com/v1/search",
            { params: { name: city, count: 1 } }
        )
        .then(res => {
            if (!res.data.results) {
                throw new Error("City not found");
            }

            const { latitude, longitude } = res.data.results[0];

            // Step 2: Fetch weather
            return axios.get(
                "https://api.open-meteo.com/v1/forecast",
                {
                    params: {
                        latitude,
                        longitude,
                        current_weather: true
                    }
                }
            );
        })
        .then(res => {
            setTemp(res.data.current_weather.temperature);
        })
        .catch(err => {
            setError("City not found or API error");
            console.error(err);
        });
    };

    return (
        <div>
            <div className="head">
                <Link to="/">Main Page</Link>
                <Link to="/temperature">Weather Page</Link>
                <br />
                <h3>Welcome to API access via Axios - Users Page!</h3>
            </div>

            <br />

            {/* Input Box */}
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />

            <button onClick={getTemperature}>Get Temperature</button>

            <br /><br />

            {/* Output */}
            {temp !== null && <h1>Temperature in {city} is {temp} °C</h1>}
            {error && <h3 style={{ color: "red" }}>{error}</h3>}
            
        </div>
    );
};

export default Temperature;