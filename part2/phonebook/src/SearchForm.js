import React from "react";

const SearchForm = ({ handleSearchInput }) => {
    return (
        <div>
            <h3>Filter by Name</h3>

            <form>
                <input type="search" onChange={handleSearchInput} />
            </form>
        </div>
    );
};

export default SearchForm;
