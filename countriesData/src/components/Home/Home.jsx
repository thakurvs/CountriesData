import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchcountriesData } from '../store/countriesSlice'
import CountryCard from '../CountryCard/CountryCard'

const Home = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

    // Get the data, loading state, and error from Redux store
  const { countriesData, loading, error } = useSelector((state) => state.countries);

    //dispatch action to fetch data when component mounts
  useEffect(() => {
    dispatch(fetchcountriesData())
  }, [dispatch]);

  const filteredData = countriesData.filter((country) => 
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    <div className="w-full mx-auto sm:px-1 lg:px-1 py-2 relative">
      <input
        type='text'
        placeholder="Where in the world?"
        value = {searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      {error && <p className="text-red-500">Error: {error}</p>}

      {loading ? (
         <p className="text-gray-500">Loading data...</p>
      ) : (
        <div className='flex flex-wrap'>
          {filteredData.map((country) => (
              <div key={country.name.common} className='w-full p-2 sm:w-1/2 lg:w-1/4'>
                  <CountryCard 
                     key={country.name.common}
                     name={country.name.common}
                     flag={country.flags.svg}
                     population={country.population}
                     region={country.region}
                     capital={country.capital?.[0]}
                     data={country}
                  />
              </div>
          ))}
       </div>
      )}
    </div>

  )
}

export default Home