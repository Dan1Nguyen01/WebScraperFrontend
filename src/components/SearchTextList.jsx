import React from "react";

function SearchTextList({
  searchHistory,
  setShowHistory,
  setShowPriceHistory,
}) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">All Products</h2>
      <ul>
        {searchHistory?.length > 0 &&
          searchHistory?.map((search) => (
            <li key={search._id} className="mb-2">
              <button
                onClick={() => setShowPriceHistory(true)}
                className="text-blue-500 hover:underline"
              >
                {search.name}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SearchTextList;
