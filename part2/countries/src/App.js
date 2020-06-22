import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import SearchForm from "./SearchForm";
import Countries from "./Countries";
import Country from "./Country";
import Weather from "./Weather";

function App() {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState({ term: "", active: false });
    const [selectedCountry, setSelectedCountry] = useState();

    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
            console.log("incoming data...", res.data);
            setCountries(res.data);
        });
    }, []);

    const trackCountryInput = (e) => {
        const newSearch = {
            term: e.target.value,
            active: e.target.value ? true : false,
        };

        setSearch(newSearch);
        setSelectedCountry();
    };

    const selectCountry = (index) => {
        setSelectedCountry(countriesToShow[index]);
        setSearch({ ...search, active: false });
    };

    const filterByCountry = () => {
        const filteredCountries = countries.filter((country) => {
            return country.name
                .toLowerCase()
                .includes(search.term.toLowerCase());
        });

        if (filteredCountries.length === 1) {
            setSelectedCountry(filteredCountries[0]);
            setSearch({ ...search, active: false });
        }

        return filteredCountries;
    };

    const countriesToShow = search.active ? filterByCountry() : [];

    return (
        <div className="App">
            <SearchForm
                searchTerm={search.term}
                handleCountryInput={trackCountryInput}
            />
            <Countries
                countries={countriesToShow}
                handleSelectedCountry={selectCountry}
            />
            {selectedCountry && (
                <div>
                    <Country country={selectedCountry} />
                    <Weather capital={selectedCountry.capital} />
                </div>
            )}
        </div>
    );
}

export default App;
