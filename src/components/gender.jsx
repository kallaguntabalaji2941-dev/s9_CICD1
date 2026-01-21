import React, { useState } from "react";

const GenderPopulation = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);

  const genderData = {
    guntur: { male: 52, female: 48 },
    hyderabad: { male: 51, female: 49 },
    delhi: { male: 53, female: 47 }
  };

  const getGenderPopulation = () => {
    const result = genderData[city.toLowerCase()];
    setData(result || null);
  };

  return (
    <div>
      <h2>Gender Population</h2>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={getGenderPopulation}>Check</button>

      {data ? (
        <>
          <p>Male: {data.male}%</p>
          <p>Female: {data.female}%</p>
        </>
      ) : (
        city && <p style={{ color: "red" }}>No data available</p>
      )}
    </div>
  );
};

export default GenderPopulation;
