import React from "react";
import "./Country.css";

const Country = ({ country }) => {
    return (
        <div className="country__container">
            <div className="country__heading">
                <img
                    className="country__flag"
                    src={country.flag}
                    alt={`The national flag of ${country.name}`}
                />
                <h2>{country.name}</h2>
            </div>
            <div>Capital: {country.capital}</div>
            <div>Population: {country.population}</div>
            <div>
                <h3>Official Languages</h3>
                <ul>
                    {country.languages.map((language) => {
                        return <li key={language.name}>{language.name}</li>;
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Country;
