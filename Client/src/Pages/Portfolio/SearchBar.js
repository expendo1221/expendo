import React, { useState } from "react";
import { AutoComplete, Input, Button } from "antd";
import axios from "axios";

const SearchBar = ({ onAddStock }) => {
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = async (value) => {
    setSearchValue(value);
    if (value) {
      const response = await axios.get(`https://finnhub.io/api/v1/search`, {
        params: {
          q: value,
          token: "cs6ee6hr01qv8tfqk820cs6ee6hr01qv8tfqk82g", // Replace with your Finnhub API key
        },
      });
      setOptions(
        response.data.result.map((stock) => ({
          value: stock.symbol,
          label: `${stock.symbol} - ${stock.description}`,
        }))
      );
    } else {
      setOptions([]);
    }
  };

  const handleSelect = (value) => {
    onAddStock(value);
    setSearchValue("");
    setOptions([]);
  };

  return (
    <AutoComplete
      options={options}
      style={{ width: 300 }}
      onSearch={handleSearch}
      onSelect={handleSelect}
      value={searchValue}
    >
      <Input.Search placeholder="Search for stocks" enterButton />
    </AutoComplete>
  );
};

export default SearchBar;