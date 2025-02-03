import { useState, useEffect } from 'react';

const API_URL = "https://restcountries.com/v3.1/all";

//create a useFetchData custom hook
const useFetchData = () => {
    const [regions, setRegions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                
                // Group countries by region
                const groupedData = data.reduce((acc, country) => {
                    if(country.region){
                        if(!acc[country.region]) {
                            acc[country.region] = { name: country.region, population: 0, gdpPerCapita: 0, count: 0 };
                        }
                        acc[country.region].population += country.population || 0;
                        acc[country.region].gdpPerCapita += country.gini ? Object.values(country.gini)[0] || 0 : 0;
                        acc[country.region].count += 1;
                    }
                    return acc;
                }, {});

                // Convert into an array and compute GDP per capita
                const processedData  = Object.values(groupedData).map(region => ({
                    ...region,
                    gdpPerCapita: region.count ? region.gdpPerCapita / region.count : 0,
                }));

                setRegions(processedData);
                setLoading(false);
            } catch (error) {   
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []);

    return { regions, loading };

};

export default useFetchData;