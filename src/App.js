import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchTextList from "./components/SearchTextList";
import TrackProductList from "./components/TrackedProductList";
import PriceHistoryTable from "./components/PriceHistoryTable";
axios.defaults.baseURL = "https://web-scraper-amazon.onrender.com";

const App = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true); // Set isLoading to true when scraping starts

      const response = await axios.post("/api/scrape", { searchItem });

      setIsLoading(false); // Set isLoading to false when scraping is done
      window.location.reload();
    } catch (error) {
      console.log(error);
      setIsLoading(false); // Set isLoading to false in case of an error
    }
  };

  useEffect(() => {
    const getSearches = async () => {
      try {
        const response = await axios.get("/api/productText");
        setSearchHistory(response.data);
      } catch (error) {
        console.error("Error fetching search history:", error);
      }
    };

    getSearches();
  }, [searchHistory.length]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6">Product Search Tool</h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <label className="mr-2">Add a new item:</label>
          <input
            type="text"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            className="border rounded p-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded ml-2"
            disabled={isLoading} // Disable button when scraping is ongoing
          >
            {isLoading ? "Scraping..." : "Start Scraper"}
          </button>
        </form>

        <TrackProductList
          searchHistory={searchHistory}
          setSearchHistory={setSearchHistory}
          setShowPriceHistory={setShowPriceHistory}
          setSelectedProductId={setSelectedProductId}
        />
        {showPriceHistory && (
          <PriceHistoryTable
            onClose={setShowPriceHistory}
            selectedProductId={selectedProductId}
          />
        )}
      </div>
    </div>
  );
};

export default App;
