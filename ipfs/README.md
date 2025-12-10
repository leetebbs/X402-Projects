# IPFS Upload with x402 Payment Integration

A Node.js application that enables secure, payment-gated file uploads to IPFS (InterPlanetary File System) using Pinata. This project integrates the x402 payment protocol to require USDC payment for file uploads on Base Sepolia testnet.

## Overview

This project demonstrates how to:
- Build an Express.js API server that accepts file uploads
- Integrate Pinata's SDK for IPFS file storage
- Implement x402 payment middleware to gate API endpoints
- Require USDC payments before allowing file uploads
- Sign and verify payment transactions on blockchain

## Features

- **Express.js API**: RESTful endpoint for file uploads
- **IPFS Integration**: Files are stored on IPFS via Pinata
- **Payment Gating**: Uses x402 protocol to require USDC payment per upload
- **Smart Contract Enabled**: Leverages blockchain for payment verification
- **Test Suite**: Includes a test script that demonstrates the full upload flow with payment

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- USDC on Base Sepolia testnet (get testnet USDC from [Circle Faucet](https://faucet.circle.com/))
- Pinata account with API JWT token
- Private key for signing transactions

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ipfs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with the following variables:
   ```env
   # Pinata Configuration
   PINATA_JWT=your_pinata_jwt_token_here
   PINATA_GATEWAY=your_pinata_gateway_url_here

   # Wallet Configuration
   PRIVATE_KEY=your_private_key_here
   RECIEVING_WALLET_ADDRESS=your_receiving_wallet_address_here

   # Network Configuration
   PUBLIC_NETWORK=base-sepolia
   ```

## Configuration

### Environment Variables

- **PINATA_JWT**: Your Pinata API JWT token for authentication
- **PINATA_GATEWAY**: Your Pinata gateway URL (e.g., `https://gateway.pinata.cloud`)
- **PRIVATE_KEY**: Private key of the wallet that will sign transactions
- **RECIEVING_WALLET_ADDRESS**: Wallet address that will receive payment
- **PUBLIC_NETWORK**: Blockchain network (default: `base-sepolia`)

### Upload Pricing

The server is configured to charge **$0.1 USDC** per file upload. This can be modified in `index.js`:

```javascript
"POST /upload": {
  price: "$0.1",
  network: process.env.PUBLIC_NETWORK || "base-sepolia",
}
```

## Usage

### Starting the Server

```bash
npm start
# or
node index.js
```

The server will start listening on `http://localhost:4021`

### Running the Test Script

The project includes a test script that demonstrates the complete upload flow:

```bash
node ipfsUploadTest.js
```

This script:
1. Attempts to upload a file without payment
2. Receives a payment requirement from the server
3. Creates and signs a payment transaction using x402
4. Retries the upload with the payment header
5. Successfully uploads the file to IPFS via Pinata

## API Endpoints

### POST `/upload`

Upload a file to IPFS.

**Request:**
- Content-Type: `multipart/form-data`
- Body: File to upload
- Header: `X-PAYMENT` (x402 signed payment header)

**Response on Success (200):**
```json
{
  "cid": "QmXxxx...",
  "filename": "example.jpg"
}
```

**Response on Payment Required (402):**
```json
{
  "accepts": [
    {
      "scheme": "x402",
      "version": 1,
      "network": "base-sepolia",
      "asset": "USDC",
      "maxAmountRequired": "0.1"
    }
  ]
}
```

**Response on Error (400):**
```json
{
  "error": "No file uploaded"
}
```

## Getting Testnet USDC

To test this application, you'll need testnet USDC on Base Sepolia:

1. Visit [Circle Faucet](https://faucet.circle.com/)
2. Connect your wallet
3. Request testnet USDC
4. Ensure you have enough USDC to cover upload fees ($0.1 per upload)

## Project Structure

```
.
├── index.js                 # Main Express server with x402 middleware
├── ipfsUploadTest.js        # Test script for file upload functionality
├── package.json             # Project dependencies
├── .env                     # Environment variables (create this)
├── testData/
│   ├── alchemyNFT.jpg       # Sample image file for testing
│   └── test-file-txt        # Sample text file for testing
└── README.md                # This file
```

## Dependencies

- **express**: Web framework for Node.js
- **pinata**: SDK for IPFS file uploads
- **x402-express**: Express middleware for x402 payment protocol
- **x402-client**: Client library for x402 payment creation
- **ethers**: Ethereum library for blockchain interactions
- **multer**: Middleware for handling file uploads
- **form-data**: Utility for FormData creation
- **dotenv**: Environment variable management

## How It Works

### Payment Flow

1. **Initial Request**: Client sends file without payment
2. **Payment Requirement**: Server responds with x402 payment requirements (402 status)
3. **Payment Creation**: Client creates and signs payment transaction using private key
4. **Retry with Payment**: Client resubmits with `X-PAYMENT` header
5. **Verification**: Server validates payment using x402 middleware
6. **Upload**: Server uploads file to IPFS via Pinata
7. **Response**: Client receives IPFS CID (Content IDentifier)

### x402 Protocol

The x402 protocol is a standardized payment protocol for the web that:
- Allows APIs to charge for access
- Uses 402 Payment Required HTTP status code
- Enables micropayments without additional infrastructure
- Supports multiple blockchains and payment tokens

## Security Considerations

- **Private Key**: Never commit your `.env` file with private keys to version control
- **JWT Tokens**: Keep Pinata JWT tokens private
- **HTTPS**: Use HTTPS in production, not HTTP
- **Rate Limiting**: Consider adding rate limiting in production
- **Input Validation**: Validate file types and sizes before upload

## Troubleshooting

### Error: "PINATA_JWT is not defined"
- Ensure `.env` file exists with `PINATA_JWT` variable
- Check that you've called `dotenv.config()` before using environment variables

### Error: "No file uploaded"
- Ensure the file is being sent as `multipart/form-data`
- Verify the form field name is `file`

### Error: "Payment verification failed"
- Ensure your wallet has sufficient USDC balance
- Verify the `PRIVATE_KEY` is correct
- Check that the network matches (`base-sepolia`)

### File Not Appearing on IPFS
- Verify your Pinata JWT is valid and has upload permissions
- Check the IPFS CID returned - you can view it at `https://gateway.pinata.cloud/ipfs/{CID}`

## Testing

To run a full end-to-end test:

```bash
# Terminal 1: Start the server
npm start

# Terminal 2: Run the test script
node ipfsUploadTest.js
```

You should see output showing:
- Initial upload attempt
- Payment requirement received
- Payment creation and signing
- Successful upload with CID

## Production Deployment

Before deploying to production:

1. Use HTTPS instead of HTTP
2. Move to mainnet or a production testnet
3. Implement rate limiting and authentication
4. Add proper error handling and logging
5. Set up monitoring for failed uploads
6. Use environment-specific configuration
7. Implement file size and type restrictions
8. Add request validation and sanitization

## Resources

- [IPFS Documentation](https://docs.ipfs.tech/)
- [Pinata Documentation](https://docs.pinata.cloud/)
- [x402 Protocol](https://x402.org/)
- [Base Network](https://base.org/)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [Circle Testnet USDC Faucet](https://faucet.circle.com/)

## License

[Add your license here]

## Support

For issues or questions, please open an issue in the repository or contact the maintainers.
