import React, { useState } from "react";
import axios from "axios";

const CityPopulation = () => {
  const [city, setCity] = useState("");
  const [population, setPopulation] = useState(null);
  const [error, setError] = useState("");

  const getPopulation = async () => {
    if (city.trim() === "") {
      setError("Enter city name");
      return;
    }

    try {
      setError("");
      setPopulation(null);

      const res = await axios.get(
        "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
        {
          params: { namePrefix: city, limit: 1 },
          headers: {
            "X-RapidAPI-Key": "YOUR_API_KEY",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
          }
        }
      );

      if (res.data.data.length === 0) {
        throw new Error("City not found");
      }

      setPopulation(res.data.data[0].population);
    } catch (err) {
      setError("City not found or API error");
    }
  };

  return (
    <div>
      <h2>City Population Finder</h2>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={getPopulation}>Find Population</button>

      {population && <h3>Population of {city}: {population}</h3>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CityPopulation;
