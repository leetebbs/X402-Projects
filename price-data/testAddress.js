require ('dotenv').config();
const { wrapFetchWithPayment, decodeXPaymentResponse } = require("x402-fetch");
const { privateKeyToAccount } = require("viem/accounts");

// Create account from private key
const account = privateKeyToAccount(process.env.PRIVATE_KEY);

const url = "http://localhost:3000/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48?network=eth-mainnet";

const fetchWithPayment = wrapFetchWithPayment(fetch, account);

fetchWithPayment(url, { 
  method: "GET",
})
  .then(async response => {
    const body = await response.json();
    console.log("Full Response:", JSON.stringify(body, null, 2));

    const paymentResponse = decodeXPaymentResponse(response.headers.get("x-payment-response"));
    console.log("\nPayment Response:", paymentResponse);
  })
  .catch(error => {
    console.error(error.response?.data?.error);
  });