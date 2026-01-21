import React, { useState } from "react";

const WaterResources = () => {
  const [city, setCity] = useState("");
  const [resources, setResources] = useState([]);

  const data = {
    guntur: ["Krishna River", "Canals", "Groundwater"],
    chennai: ["Cauvery River", "Reservoirs", "Rainwater"],
    hyderabad: ["Hussain Sagar", "Manjeera River"]
  };

  const getResources = () => {
    setResources(data[city.toLowerCase()] || []);
  };

  return (
    <div>
      <h2>Water Resources</h2>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={getResources}>Find Water Resources</button>

      <ul>
        {resources.length > 0
          ? resources.map((r, i) => <li key={i}>{r}</li>)
          : city && <p style={{ color: "red" }}>No data available</p>}
      </ul>
    </div>
  );
};

export default WaterResources;
