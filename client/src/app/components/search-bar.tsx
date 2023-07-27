import React, { useState } from "react";

const SearchBar = ({ onSearchChange }: any) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    const encodedInput = encodeURIComponent(searchInput);
    window.history.pushState(null, "", `?name=${encodedInput}`);
    onSearchChange(searchInput);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex justify-center my-4">
      <div className="flex border border-purple-200 rounded">
        <input
          type="text"
          className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Enter an employee's name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            handleKeyDown(e);
          }}
        />
        <button
          className="px-4 text-white bg-purple-600 border-l rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
