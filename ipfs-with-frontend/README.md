# XFile402

XFile402 is a decentralized file storage application that combines IPFS (InterPlanetary File System) with x402 payment protocol. It enables users to upload files to IPFS via Pinata while automatically handling Web3 payments on the Base Sepolia testnet.

## Features

- **Decentralized Storage**: Upload files directly to IPFS using Pinata
- **x402 Payment Integration**: Automatic payment handling using the x402 protocol
- **Web3 Wallet Integration**: Connect and use MetaMask or any Web3 wallet
- **Multiple File Types**: Support for images, PDFs, and text files
- **File Previews**: Preview images and text content before upload
- **IPFS CID Display**: Get the content identifier (CID) for each uploaded file
- **Gateway URLs**: Access uploaded files via Pinata's IPFS gateway
- **Dark Mode Support**: Full dark/light theme support
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

- **Frontend**: Next.js 16 with React 19
- **Styling**: Tailwind CSS
- **Web3**: Viem for wallet integration
- **IPFS**: Pinata SDK for decentralized storage
- **Payment**: x402 protocol with x402-next middleware
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MetaMask or another Web3 wallet
- Pinata API credentials
- x402 account on Base Sepolia testnet

### Installation

1. Clone the repository:
```bash
git clone https://github.com/leetebbs/X402-Projects.git
cd ipfs-with-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file with your configuration:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your credentials:
```env
NETWORK="base-sepolia"
PRICE=0.01
RECIEVING_WALLET_ADDRESS=your_wallet_address_here
IPFS_API_KEY=your_ipfs_api_key
PINATA_JWT=your_pinata_jwt_token
PINATA_GATEWAY=your_pinata_gateway_url
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

1. **Select File**: Choose an image, PDF, or text file to upload
2. **Preview**: Review the file preview (available for images and text)
3. **Upload**: Click the upload button to submit your file
4. **Payment**: The x402 middleware will handle the payment automatically
5. **Confirmation**: View your file's IPFS CID, filename, and gateway URL upon successful upload

## API Routes

### POST `/api/upload`
Uploads a file to IPFS via Pinata.

**Request**: FormData with a `file` field
**Response**:
```json
{
  "url": "https://your-gateway.mypinata.cloud/ipfs/QmXxxx...",
  "filename": "example.jpg",
  "ipfsHash": "QmXxxx...",
  "timestamp": "2025-12-10T00:00:00.000Z"
}
```

**Payment**: Protected by x402 middleware ($0.01)

## Project Structure

```
app/
├── components/
│   └── header.tsx          # Header component with branding
├── api/
│   └── upload/
│       └── route.ts        # IPFS upload endpoint
├── layout.tsx              # Root layout with header
├── page.tsx                # Main file upload page
└── globals.css             # Global styles

middleware.ts              # x402 payment middleware configuration
.env.example              # Environment variables template
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NETWORK` | Blockchain network (e.g., "base-sepolia") |
| `PRICE` | Upload price in USD |
| `RECIEVING_WALLET_ADDRESS` | Wallet to receive payments |
| `IPFS_API_KEY` | IPFS API key |
| `PINATA_JWT` | Pinata JWT authentication token |
| `PINATA_GATEWAY` | Pinata IPFS gateway URL |

## How It Works

1. **File Upload**: User selects a file through the web interface
2. **Wallet Connection**: Application requests connection to user's Web3 wallet
3. **Payment Processing**: x402 middleware intercepts the upload request and initiates payment
4. **IPFS Storage**: Upon successful payment, file is uploaded to IPFS via Pinata
5. **Confirmation**: User receives the IPFS CID and gateway URL

## Building for Production

```bash
npm run build
npm start
```

## Deployment

This application can be deployed on Vercel, Netlify, or any Node.js hosting platform that supports Next.js.

### Vercel Deployment

```bash
vercel
```

## License

This project is part of the X402-Projects ecosystem.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Pinata Documentation](https://docs.pinata.cloud)
- [x402 Protocol](https://x402.org)
- [Viem Documentation](https://viem.sh)
- [IPFS Documentation](https://docs.ipfs.io)
