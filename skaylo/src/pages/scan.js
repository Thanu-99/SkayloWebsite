// src/pages/Scan.js
import React, { useState } from "react";
import "../scan.css"; // 👈 NEW CSS FILE (frontend only)

const Scan = () => {
  const [productName, setProductName] = useState("");
  const [productInfo, setProductInfo] = useState(null);

 const scanProduct = async () => {
  if (!productName) {
    alert("Enter a product name");
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:5000/product/name/${encodeURIComponent(productName)}`
    ); // ✅ only one closing parenthesis here

    if (!res.ok) {
      setProductInfo(null);
      alert("Product not found");
      return;
    }

    const data = await res.json();
    setProductInfo(data);
  } catch (err) {
    console.error(err);
    alert("Error contacting server");
  }
};


  return (
    <div className="scan-page">
      {/* Soft animated background */}
      <div className="scan-bg" />

      <div className="scan-card">
        <h2 className="scan-title">Scan Your Food</h2>
        <p className="scan-subtitle">
          Know what you eat. No fear. Just facts.
        </p>

        <div className="scan-input-group">
          <input
            type="text"
            placeholder="Type product name…"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="scan-input"
          />
          <button onClick={scanProduct} className="scan-btn">
            Scan
          </button>
        </div>
       {productInfo && (
  <div className="result-card">
    <h3 className="product-name">
      {productInfo.name || "Unknown Product"}
    </h3>

    <div className="result-grid">
      <div><strong>Calories:</strong> {productInfo.calories || "N/A"}</div>
      <div><strong>Risk Level:</strong> {productInfo.riskLevel || "N/A"}</div>
      <div>
        <strong>Avoid For:</strong>{" "}
        {productInfo.avoidFor ? productInfo.avoidFor.join(", ") : "N/A"}
      </div>
      <div>
        <strong>Burn Time:</strong> {productInfo.burnTime || "N/A"} mins
      </div>
      <div>
        <strong>Ingredients:</strong>{" "}
        {productInfo.ingredients ? productInfo.ingredients.join(", ") : "N/A"}
      </div>
      <div>
        <strong>Notes:</strong> {productInfo.notes || "N/A"}
      </div>
    </div>
  </div>
)}

        
      </div>
    </div>
  );
};

export default Scan;
