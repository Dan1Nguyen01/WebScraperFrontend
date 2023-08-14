import React, { useEffect, useState } from "react";
import ModalComponent from "./Modal";
import ProductDetailsPage from "./ProductDetailsPage";
import axios from "axios";

function PriceHistoryTable({ onClose, selectedProductId }) {
  const [modalStates, setModalStates] = useState({});
  const [products, setProducts] = useState([]);

  const openModal = (productId) => {
    setModalStates((prevState) => ({
      ...prevState,
      [productId]: true,
    }));
  };

  const closeModal = (productId) => {
    setModalStates((prevState) => ({
      ...prevState,
      [productId]: false,
    }));
  };

  useEffect(() => {
    if (selectedProductId !== null) {
      const scrapeProduct = async () => {
        try {
          const response = await axios.get(
            `/api/products?id=${selectedProductId}`
          );
          setProducts(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      scrapeProduct();
    }
  }, [selectedProductId]);

  return (
    <div className="p-4 relative">
      <button
        onClick={() => onClose(false)}
        className="absolute top-0 right-0 mt-2 mr-2 px-2 py-1 bg-red-500 text-white rounded"
      >
        Close
      </button>
      <h2 className="text-2xl font-semibold mb-4">Price History</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Created At</th>
            <th className="p-2">Updated At</th>
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Price Change</th>
            <th className="p-2">Percentage Change</th>
            <th className="p-2">Review</th>
          </tr>
        </thead>
        <tbody>
          {products?.length > 0 &&
            products.map((product) => (
              <tr key={product?.url} className="bg-white">
                <td className="p-2">
                  <div className="whitespace-nowrap">
                    {new Date(product?.createdAt).toLocaleString()}
                  </div>
                </td>
                <td className="p-2">
                  <div className="whitespace-nowrap">
                    {new Date(product?.updatedAt).toLocaleString()}
                  </div>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => openModal(product._id)}
                    className="text-blue-500 hover:underline"
                  >
                    {product.name}
                  </button>
                </td>
                <td className="p-2">${product?.price}</td>
                <td
                  className={`${
                    product.priceChange > 0 ? "text-red-500" : "text-green-500"
                  } p-2`}
                >
                  {product.priceChange > 0 && "+"}${product.priceChange}
                </td>
                <td
                  className={`${
                    product.priceChange > 0 ? "text-red-500" : "text-green-500"
                  } p-2`}
                >
                  {product.priceChangePercentage > 0 && "+"}
                  {product.priceChangePercentage} %
                </td>
                <td
                  className={`${
                    product.ratingChange >= 0
                      ? "text-yellow-600"
                      : "text-red-500"
                  } p-2`}
                >
                  {product.rating} |{product.ratingChange > 0 && "+"}
                  {product.ratingChange} %
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {products.length > 0 &&
        products.map((product) => (
          <ModalComponent
            key={product._id}
            isOpen={modalStates[product._id] || false}
            closeModal={() => closeModal(product._id)}
            content={<ProductDetailsPage product={product} />}
          />
        ))}
    </div>
  );
}

export default PriceHistoryTable;
