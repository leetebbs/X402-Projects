# X402 Price Data API

A payment-protected API service for retrieving cryptocurrency token price data. Built with Express.js and integrated with the x402 payment protocol for secure, paid API access.

## Overview

This project provides two main endpoints for accessing token pricing information:
- **`/symbol`** - Get token prices by symbol (e.g., ETH, USDC)
- **`/address`** - Get token prices by blockchain address

All endpoints are protected by the x402 payment middleware, requiring a payment in USDC (Base Sepolia testnet) to access.

## Live Deployment

The API is live and deployed on Vercel:
**https://x402pricedata.vercel.app/**

## API Endpoints

### 1. Get Token Price by Symbol

**Endpoint:** `GET /symbol`

**Query Parameters:**
- `request` (required) - Token symbol (e.g., ETH, USDC, BTC)

**Example:**
```
https://x402pricedata.vercel.app/symbol?request=ETH
https://x402pricedata.vercel.app/symbol?request=USDC
https://x402pricedata.vercel.app/symbol?request=BTC
```

**Response:**
```json
{
  "data": [
    {
      "symbol": "ETH",
      "prices": [
        {
          "network_name": "ethereum",
          "price": 3500.50
        }
      ]
    }
  ]
}
```

### 2. Get Token Price by Address

**Endpoint:** `GET /address/:address`

**Path Parameters:**
- `address` (required) - Token contract address (e.g., 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48)

**Query Parameters:**
- `network` (optional, default: eth-mainnet) - Blockchain network

**Example:**
```
https://x402pricedata.vercel.app/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
https://x402pricedata.vercel.app/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48?network=eth-mainnet
https://x402pricedata.vercel.app/address/0xdac17f958d2ee523a2206206994597c13d831ec7?network=eth-mainnet
```

**Response:**
```json
{
  "data": [
    {
      "network": "eth-mainnet",
      "address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "prices": [
        {
          "network_name": "ethereum",
          "price": 1.0
        }
      ]
    }
  ]
}
```

## Payment Requirements

Both endpoints are protected by the x402 payment protocol:
- **Network:** Base Sepolia (testnet)
- **Price:** $0.01 USDC per request
- **Facilitator:** https://x402.org/facilitator

## Making Paid Requests

### Using x402-fetch (Recommended)

```javascript
const { wrapFetchWithPayment, decodeXPaymentResponse } = require("x402-fetch");
const { privateKeyToAccount } = require("viem/accounts");

// Create account from private key
const account = privateKeyToAccount(process.env.PRIVATE_KEY);

const fetchWithPayment = wrapFetchWithPayment(fetch, account);

fetchWithPayment("https://x402pricedata.vercel.app/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", {
  method: "GET",
})
  .then(async response => {
    const body = await response.json();
    console.log(body);

    const paymentResponse = decodeXPaymentResponse(response.headers.get("x-payment-response"));
    console.log(paymentResponse);
  })
  .catch(error => {
    console.error(error);
  });
```

### Using cURL (First request without payment)

The API will return a 402 Payment Required response with payment details:

```bash
curl https://x402pricedata.vercel.app/symbol?request=ETH
```

## Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Payment Protocol:** x402
- **Data Source:** Alchemy API (Token Prices API)
- **Deployment:** Vercel

## Environment Variables

```env
PRIVATE_KEY=your_wallet_private_key
API_KEY=your_alchemy_api_key
RECIEVING_WALLET_ADDRESS=your_wallet_address
PRICE=0.01
NETWORK=base-sepolia
PORT=3000
```

## Development

### Install Dependencies
```bash
npm install
```

### Run Locally
```bash
node index.js
```

The server will start on `http://localhost:3000`

### Test Endpoints
```bash
node test.js          # Test /address endpoint
node testSymbol.js    # Test /symbol endpoint
```

## Project Structure

```
.
├── index.js           # Main Express application
├── test.js            # Test script for /address endpoint
├── testSymbol.js      # Test script for /symbol endpoint
├── package.json       # Dependencies and scripts
├── .env               # Environment variables (not committed)
└── README.md          # This file
```

## References

- [x402 Documentation](https://x402.gitbook.io/)
- [x402-fetch npm](https://www.npmjs.com/package/x402-fetch)
- [Alchemy Token Prices API](https://docs.alchemy.com/reference/alchemy-getTokenPrices)
- [Vercel Deployment](https://vercel.com/)

