import React from "react";
import "./Countries.css";

const Countries = ({ countries, handleSelectedCountry }) => {
    return (
        <div className="countries__container">
            {countries.length > 10 ? (
                <p>Too many matches. Please specify another filter.</p>
            ) : (
                countries.map((country, index) => {
                    return (
                        <div className="countries__country" key={country.name}>
                            <span>{country.name}</span>
                            <button
                                className="countries__show-country-button"
                                onClick={() => {
                                    handleSelectedCountry(index);
                                }}
                            >
                                Show
                            </button>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default Countries;
