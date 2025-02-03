import React, { useState, useEffect } from 'react'
import LineChart from '../Charts/LineChart';
import BarChart from '../Charts/BarChart';

const API_URL = "https://restcountries.com/v3.1/all";
 
function Dashboard() {
    const [countries, setCountries] = useState([]);
    // const [selectedCountries, setSelectedCountries] = useState([]);
  
    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
          .then(res => res.json())
          .then(data => {
            const formattedData = data.map(country => ({
              name: country.name.common,
              population: country.population,
            }));
            setCountries(formattedData.sort((a, b) => b.population - a.population).slice(0, 20)); // Top 20
          })
          .catch(error => console.error("Error fetching data:", error));
    }, []);
    
  
    // Handle country selection
    // const handleSelection = (event) => {
    //   const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    //   setSelectedCountries(selectedOptions);
    // };
  
    return (
        <div>
          <h2>Country Populations</h2>
          <BarChart data={countries} />
        </div>
    );
}

export default Dashboard;