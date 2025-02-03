import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './CountryCard.scss'

function CountryCard({ name, flag, population, region, capital, data }) {
  return (
    <div className="country-card w-full text-center border-[1px] border-[#eaeaea]">
        <Link to={`/${name}`} state={data}>
            <img src={flag} alt={name + ' Flag'} />
            <div className="card-text">
                <h3 className="card-title">{name}</h3>
                <p>
                <b>Population: </b>
                {population.toLocaleString('en-IN')}
                </p>
                <p>
                <b>Region: </b>{region}
                </p>
                <p>
                <b>Capital: </b>{capital}
                </p>
            </div>
        </Link>
    </div>
  )
}

export default CountryCard