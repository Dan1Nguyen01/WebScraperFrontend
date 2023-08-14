import React from "react";
import ApexCharts from "react-apexcharts";

const ProductDetailsPage = ({ product }) => {
  const priceChange = product.price + product.priceChange;
  const priceChangePercentage = (
    (product.priceChange / product.price) *
    100
  ).toFixed(2);

  const chartData = {
    options: {
      chart: {
        id: "price-chart",
      },
      xaxis: {
        categories: [
          new Date(product?.createdAt).toDateString(),
          new Date(product?.updatedAt).toDateString(),
        ], // Include dateCreated and dateUpdated
      },
      annotations: {
        points: [
          {
            x: new Date(product?.createdAt).toDateString(), // x-axis value (timestamp)
            y: priceChange, // y-axis value (priceChange)
            marker: {
              size: 6,
              fillColor: "#ff5722",
              radius: 2,
            },
            label: {
              borderColor: "#ff5722",
              style: {
                color: "#fff",
                background: "#ff5722",
              },
              text: `Price Change: $${priceChange}`,
            },
          },
          {
            x: new Date(product?.updatedAt).toDateString(), // x-axis value (timestamp)
            y: product.rating, // y-axis value (rating)
            marker: {
              size: 6,
              fillColor: "#2196f3",
              radius: 2,
            },
            label: {
              borderColor: "#2196f3",
              style: {
                color: "#fff",
                background: "#2196f3",
              },
              text: `Rating: ${product.rating}`,
            },
          },
        ],
      },
    },
    series: [
      {
        name: "Price",
        data: [product.price], // Use an array with a single value
      },
      {
        name: "Rating",
        data: [product.rating], // Use an array with a single value
      },
    ],
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
      <img src={product.img} alt="Product" className="mb-4" />
      <p className="mb-2">
        URL:{" "}
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View product.
        </a>
      </p>
      <h2 className="text-xl font-semibold mb-2">Price History</h2>
      <p>Current Price: ${product.price}</p>
      <p>Price Change: ${priceChange}</p>
      <p>Percentage Change: {priceChangePercentage}%</p>
      <ApexCharts
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={300}
      />
    </div>
  );
};

export default ProductDetailsPage;
