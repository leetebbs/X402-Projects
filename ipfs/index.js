import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { paymentMiddleware} from "x402-express";
import { PinataSDK } from "pinata";
import multer from "multer";



const app = express();
const upload = multer({ storage: multer.memoryStorage() });


const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.PINATA_GATEWAY,
});


app.use(paymentMiddleware(
  process.env.RECIEVING_WALLET_ADDRESS,
  {  // Route configurations for protected endpoints
      "POST /upload": {
        // USDC amount in dollars
        price: "$0.1",
        network: process.env.PUBLIC_NETWORK || "base-sepolia",
      }
    },
  {
    url: "https://x402.org/facilitator", // Facilitator URL for Base Sepolia testnet.
  }
));


app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: "No file uploaded" });
  }
  
  const uploadedFile = new File([req.file.buffer], req.file.originalname, { type: req.file.mimetype });
  const uploadResult = await pinata.upload.public.file(uploadedFile);
  console.log('File uploaded to Pinata with CID:', uploadResult.cid);
  res.send({
    cid: uploadResult.cid,
    filename: req.file.originalname,
  });
});

app.listen(4021, () => {
  console.log(`Server listening at http://localhost:4021`);
});