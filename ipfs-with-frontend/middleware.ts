import { paymentMiddleware} from 'x402-next';

// Configure the payment middleware
export const middleware = paymentMiddleware(
  process.env.RECIEVING_WALLET_ADDRESS as `0x${string}`, // your receiving wallet address
  {  // Route configurations for protected endpoints
    '/api/upload': {
      price: process.env.PRICE ? parseFloat(process.env.PRICE) : 0.01, 
      network: (process.env.NETWORK || 'base-sepolia') as "base-sepolia" | "abstract" | "abstract-testnet" | "base" | "avalanche-fuji" | "avalanche" | "iotex" | "solana-devnet" | "solana" | "sei" | "sei-testnet" | "polygon" | "polygon-amoy" | "peaq" | "story" | "educhain" | "skale-base-sepolia",
      config: {
        description: 'Access to protected content'
      }
    }
  },
  {
    url: "https://x402.org/facilitator", // Facilitator URL for Base Sepolia testnet.
  }
);

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/api/upload/:path*',
  ],
  runtime: 'nodejs', // Use Node.js runtime instead of Edge
};