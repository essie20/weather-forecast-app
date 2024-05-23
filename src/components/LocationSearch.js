import React, { useState } from "react";
import AsyncSelect from 'react-select/async';

function LocationSearch({ getForecast }) {

  let [debounceTimerId, setDebounceTimerId] = useState([]);
  let [selectedCity, setSelectedCity] = useState([]);

  async function searchCities(searchString) {
    if (!searchString) return [];
    let params = `city=${searchString}`;
    let response = await fetch(`https://nominatim.openstreetmap.org/search?${params}&format=json&addressdetails=1`);
    let data = await response.json();
    let cities = data.filter(city => city.address.city)
    let cityOptions = 
      cities.map(city => {
        return { 
          value: city.address.city, 
          label: `${city.address.city}, ${city.address.country}`,
          lat: city.lat,
          lon: city.lon
        }
      })
    return cityOptions;
  }

  function loadOptions(searchString, callback) {
    if (debounceTimerId) clearTimeout(debounceTimerId);
    let id = setTimeout(async () => {
      callback(await searchCities(searchString));
    }, 1000);
    setDebounceTimerId(id);
  }

  const styles = {
    container: base => ({
      ...base,
      flex: 1
    })
  };

  return (
    <div className="input-container">
      <AsyncSelect 
        value={selectedCity}
        onChange={setSelectedCity}
        styles={styles} 
        loadOptions={loadOptions}
        />
      <div className="button-forecast">
        <button onClick={() => getForecast(selectedCity)}>Get forecast</button>
      </div>
    </div>
  )
}

export default LocationSearch;