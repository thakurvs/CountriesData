import React, { useState, useEffect } from 'react'
import BarChartD3 from '../Charts/BarChartD3';
import Select from 'react-select'
import './ContinentsGraph.css'

function ContinentsGraph() {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState({ value: "Asia",label: "Asia" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
          .then((res) => res.json())
          .then((data) => {
            const formattedData = data.map(country => ({
              name: country.name.common,
              population: country.population,
              region: country.region,
            }));
            setCountries(formattedData);
            //set the initial region as Asia 
            const asiaCountries = formattedData.filter((country) => country.region === "Asia");
            setFilteredCountries(asiaCountries);
            setLoading(false);
          })
          .catch(error => console.error("Error fetching data:", error));
          setError(error);
          setLoading(false);
    }, []);

    //collecting unique values aka regions using Set method and storing them in regions array
    const regions = [...new Set(countries.map((country) => country.region))].map((region) => ({
        value: region,
        label: region,
    }));

    const handleRegionChange  = (selectedOption) => {
        setSelectedRegion(selectedOption);
        if (selectedOption) {
            setFilteredCountries(countries.filter((country) => country.region === selectedOption.value));
        } else {
            setFilteredCountries(countries);
        }
    };

    return (
      <div className="chart-container">
        <Select
            options={regions}
            isClearable
            placeholder="Filter by Region"
            value={selectedRegion}
            onChange={handleRegionChange}
            className="dropdown"
        />

        {error && <p className="text-red-500">Error: {error}</p>}

        {loading ? (
         <p className="text-gray-500">Loading data...</p>
          ) : (
            <>
              <svg id="bar-chart"></svg>
              <BarChartD3 data={filteredCountries} />
            </>
        )}
      </div>
    );

   
}

export default ContinentsGraph