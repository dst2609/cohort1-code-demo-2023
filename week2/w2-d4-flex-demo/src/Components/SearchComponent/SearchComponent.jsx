import React from "react";
import { useState } from "react";

const SearchComponent = () => {
  const data = [
    { id: 1, name: "Devarsh" },
    { id: 2, name: "Ronesha" },
    { id: 3, name: "Alex" },
    { id: 4, name: "Jack" },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);

    setFilteredData(
      data.filter((item) =>
        item.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <div>
      <h1>Search</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Enter search query....."
      />

      {/* {data.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))} */}

      {filteredData.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
};

export default SearchComponent;
