import React, { useState } from "react";
import { Input, Button } from "antd";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSearchStock }) => {
  const [stockSymbol, setStockSymbol] = useState("");

  const handleSearch = () => {
    if (stockSymbol) {
      onSearchStock(stockSymbol);
      setStockSymbol("");
    }
  };

  return (
    <div className={styles.searchBar}>
      <Input
        placeholder="Enter Stock Symbol (e.g., AAPL)"
        value={stockSymbol}
        onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
        style={{ width: 200 }}
      />
      <Button onClick={handleSearch} type="primary" style={{ marginLeft: 10 }}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
