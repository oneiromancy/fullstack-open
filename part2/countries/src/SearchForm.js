import React from "react";

const SearchForm = ({ searchTerm, handleCountryInput }) => {
    return (
        <div>
            <h2>Search for a country</h2>
            <input
                value={searchTerm}
                onChange={handleCountryInput}
                type="search"
            />
        </div>
    );
};

export default SearchForm;
