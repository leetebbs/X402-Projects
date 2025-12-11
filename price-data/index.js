require ('dotenv').config();
const express = require('express');
const { paymentMiddleware, Network } = require("x402-express");
const app = express();
app.use(express.json());

app.use(paymentMiddleware(
  process.env.RECIEVING_WALLET_ADDRESS, // your receiving wallet address
  {  // Route configurations for protected endpoints
      "GET /symbol": {
        // USDC amount in dollars
        price: process.env.PRICE || 0.01,
        network: process.env.NETWORK
      },
      "GET /address/*": {
        // USDC amount in dollars
        price: process.env.PRICE || 0.01,
        network: process.env.NETWORK
      }
    },
  {
    url: "https://x402.org/facilitator", // Facilitator URL for Base Sepolia testnet.
  }
));

const apiKey = process.env.API_KEY;

async function getTokenPricesBySymbol(symbol) {
  try {
    const response = await fetch(`https://api.g.alchemy.com/prices/v1/tokens/by-symbol?symbols=${symbol}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    const data = await response.json();
    console.log("Token Prices By Symbol:");
    console.log(JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}


async function getTokenPricesByAddress(address, network) {
  try {
    const response = await fetch('https://api.g.alchemy.com/prices/v1/tokens/by-address', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({ addresses: [{ address, network }] })
    });
    const data = await response.json();
    console.log("Token Prices By Address:");
    console.log(JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}


app.get('/', (req, res) => {
    res.send('Server Running!');
    });

app.get("/symbol", async (req, res) => {
    const request = req.query.request;
    console.log("Received request for symbols:", request);
    const symbol = request;
    const data = await getTokenPricesBySymbol(symbol);
    res.json(data);
});

app.get("/address/:address", async (req, res) => {
    const address = req.params.address;
    const network = req.query.network;
    console.log("Received request for address:", address);
    const data = await getTokenPricesByAddress(address, network);
    res.json(data);
});
    
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});