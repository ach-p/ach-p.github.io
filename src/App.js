import React, { useState, useEffect } from 'react';
import './App.css';
const CrossBorderSalesCalculator = () => {
  const [inputs, setInputs] = useState({
    salePrice: 22.99,
    productionCost: 3.5,
    shippingCost: 0.4,
    customDuty: 0.07,
    fbaFee: 3.45,
    exchangeRate: 32,
    thplStorageFee: 0.5,
    shopifyD2DFee: 0.3,
  });

  const [results, setResults] = useState({
    totalCost: 0,
    profit: 0,
    profitMargin: 0,
    costBreakdown: {},
  });

  useEffect(() => {
    const totalCost = 
      inputs.productionCost +
      inputs.shippingCost +
      inputs.customDuty +
      inputs.fbaFee +
      inputs.thplStorageFee +
      inputs.shopifyD2DFee;
    
    const profit = inputs.salePrice - totalCost;
    const profitMargin = (profit / inputs.salePrice) * 100;

    const costBreakdown = {
      productionCost: (inputs.productionCost / inputs.salePrice) * 100,
      shippingCost: (inputs.shippingCost / inputs.salePrice) * 100,
      customDuty: (inputs.customDuty / inputs.salePrice) * 100,
      fbaFee: (inputs.fbaFee / inputs.salePrice) * 100,
      thplStorageFee: (inputs.thplStorageFee / inputs.salePrice) * 100,
      shopifyD2DFee: (inputs.shopifyD2DFee / inputs.salePrice) * 100,
    };

    setResults({
      totalCost: totalCost.toFixed(2),
      profit: profit.toFixed(2),
      profitMargin: profitMargin.toFixed(2),
      costBreakdown,
    });
  }, [inputs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const inputStyle = {
    width: '100px',
    padding: '5px',
    margin: '5px 0',
  };

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
  };

  const cellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Detailed Cross-border Sales Calculator (NT$/USD: 32)</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={cellStyle}>Item</th>
            <th style={cellStyle}>Value (USD)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(inputs).map(([key, value]) => (
            <tr key={key}>
              <td style={cellStyle}>{key.split(/(?=[A-Z])/).join(" ").charAt(0).toUpperCase() + key.split(/(?=[A-Z])/).join(" ").slice(1)}</td>
              <td style={cellStyle}>
                <input
                  type="number"
                  name={key}
                  value={value}
                  onChange={handleInputChange}
                  style={inputStyle}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px' }}>
        <h3>Results</h3>
        <p>Total Cost: ${results.totalCost} ({((results.totalCost / inputs.salePrice) * 100).toFixed(2)}% of sale price)</p>
        <p>Profit: ${results.profit} ({results.profitMargin}% of sale price)</p>
        <h4>Cost Breakdown (as % of sale price):</h4>
        <ul>
          {Object.entries(results.costBreakdown).map(([key, value]) => (
            <li key={key}>{key.split(/(?=[A-Z])/).join(" ").charAt(0).toUpperCase() + key.split(/(?=[A-Z])/).join(" ").slice(1)}: {value.toFixed(2)}%</li>
          ))}
        </ul>
        <p>Production Cost (NTD): NT${(inputs.productionCost * inputs.exchangeRate).toFixed(2)}</p>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <CrossBorderSalesCalculator />
    </div>
  );
}

export default App;