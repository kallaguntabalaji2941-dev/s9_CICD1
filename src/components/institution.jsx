import React, { useState } from "react";
import axios from "axios";

const EducationInstitutions = () => {
  const [city, setCity] = useState("");
  const [schools, setSchools] = useState([]);

  const getInstitutions = async () => {
    const query = `
      [out:json];
      area[name="${city}"]->.searchArea;
      (
        node["amenity"="school"](area.searchArea);
        node["amenity"="college"](area.searchArea);
        node["amenity"="university"](area.searchArea);
      );
      out body 10;
    `;

    const res = await axios.post(
      "https://overpass-api.de/api/interpreter",
      query,
      { headers: { "Content-Type": "text/plain" } }
    );

    setSchools(res.data.elements);
  };

  return (
    <div>
      <h2>Educational Institutions</h2>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={getInstitutions}>Find Institutions</button>

      <ul>
        {schools.map((s, i) => (
          <li key={i}>{s.tags?.name || "Unnamed Institution"}</li>
        ))}
      </ul>
    </div>
  );
};

export default EducationInstitutions;
