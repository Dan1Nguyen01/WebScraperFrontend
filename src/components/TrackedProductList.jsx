import React, { useState, useEffect } from "react";
import axios from "axios";

const TrackedProductList = ({
  searchHistory,
  setSeachHistory,
  setShowPriceHistory,
  setSelectedProductId,
}) => {
  const [trackedProducts, setTrackedProducts] = useState([]);
  const [newTrackedProduct, setNewTrackedProduct] = useState("");

  const handleNewTrackedProductChange = (event) => {
    setNewTrackedProduct(event.target.value);
  };

  const handleToggleTrackedProduct = async (productId) => {
    try {
      // Your code to toggle tracked product status
    } catch (error) {
      console.error("Error toggling tracked product:", error);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Tracked Products</h2>
      <ul className="space-y-2" style={{ listStyleType: "none" }}>
        {searchHistory?.length > 0 &&
          searchHistory.map((product) => (
            <li key={product._id} className="flex items-center">
              <input
                type="checkbox"
                onChange={() => handleToggleTrackedProduct(product._id)}
                checked={product.tracked}
                className="mr-2"
              />
              <button
                onClick={() => {
                  setShowPriceHistory(true);
                  setSelectedProductId(product._id);
                }}
                className="text-blue-500 hover:underline"
              >
                {product.name}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TrackedProductList;
