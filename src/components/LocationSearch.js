import React, { useState, useEffect } from "react";
import AsyncSelect from 'react-select/async';

function LocationSearch({ getForecast }) {

  const [autocompleteCities, setAutocompleteCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

  useEffect(() => {
    if (!searchTerm) return;

    const delayDebounceFn = setTimeout(async () => {
      let params = `city=${searchTerm}`;
      let response = await fetch(`https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmap.org/search?${params}&format=json&addressdetails=1`);
      let data = await response.json();
      console.log(data)
      setAutocompleteCities(data.filter(city => city.address.city));
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  async function searchCities(searchString, callback) {
    let params = `city=${searchString}`;
        let response = await fetch(`https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmap.org/search?${params}&format=json&addressdetails=1`);
        let data = await response.json();
        console.log(data)
        //setAutocompleteCities(data.filter(city => city.address.city));
        let cityOptions = data
          .filter(city => city.address.city)
          .map(city => ({ value: city.address.city, label: city.address.city }))
        callback(cityOptions);

      // setTimeout(async () => {
      // }, 1000)

  }

  return (
    <form className="input-container">
      <div>
      <AsyncSelect loadOptions={searchCities} />

      </div>

      {/* <input 
        type="text"
        placeholder="Enter city..."
        onChange={(e) => setSearchTerm(e.target.value)}
        list="cities"/>

      <datalist id="cities">
        {autocompleteCities.map((city, i) => (
          <option key={i}>{city.address.city}</option>
        ))}
      </datalist> */}
      <div>
      <button onClick={() => getForecast()}>Get forecast</button>
      </div>
    </form>
  )
}

export default LocationSearch;