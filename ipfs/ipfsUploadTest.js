import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';
import { createSigner } from 'x402/types';
import { createPaymentHeader, selectPaymentRequirements } from 'x402/client';

// Configuration
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const X402_VERSION = 1;
const NETWORK = process.env.PUBLIC_NETWORK || "base-sepolia";

// Test upload file endpoint
async function testFileUpload() {
  try {
    console.log('Testing file upload to /upload endpoint...');
    
    // Create x402 signer from private key
    const signer = await createSigner(NETWORK, PRIVATE_KEY);

    const FILE_PATH = './testData/alchemyNFT.jpg';  // Change this to any file you want to upload
    const fileBuffer = fs.readFileSync(FILE_PATH);
    const fileName = FILE_PATH.split('/').pop(); 
    
    // Create FormData to send file
    const formData = new FormData();
    formData.append('file', fileBuffer, fileName);
    
    // Make initial request to /upload endpoint (will fail with X-PAYMENT header requirement)
    const initialResponse = await fetch('http://localhost:4021/upload', {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders(),
    });
    
    const data = await initialResponse.json();
    
    if (initialResponse.ok) {
      console.log('✓ File uploaded successfully!');
      console.log('CID:', data.cid);
      console.log('Filename:', data.filename);
      return data;
    } else if (data.accepts && data.accepts.length > 0) {
      console.log('X-PAYMENT header required. Processing payment...');
      
      try {
        // Select the best payment requirement (usually USDC on the specified network)
        const paymentRequirement = selectPaymentRequirements(data.accepts);
        
        console.log('Selected payment requirement:', {
          scheme: paymentRequirement.scheme,
          network: paymentRequirement.network,
          asset: paymentRequirement.asset,
          amount: paymentRequirement.maxAmountRequired,
        });
        
        // Create and sign payment header with the signer (all in one step)
        const signedPayment = await createPaymentHeader(signer, X402_VERSION, paymentRequirement);
        
        console.log('Payment created and signed successfully');
        
        // Recreate FormData for retry
        const formDataRetry = new FormData();
        formDataRetry.append('file', fileBuffer, fileName);
        
        // Retry request with X-PAYMENT header
        const retryResponse = await fetch('http://localhost:4021/upload', {
          method: 'POST',
          body: formDataRetry,
          headers: {
            ...formDataRetry.getHeaders(),
            'X-PAYMENT': signedPayment,
          },
        });
        
        const retryData = await retryResponse.json();
        
        if (retryResponse.ok) {
          console.log('✓ File uploaded successfully after payment!');
          console.log('CID:', retryData.cid);
          console.log('Filename:', retryData.filename);
          return retryData;
        } else {
          console.error('✗ Upload failed after payment:', retryData);
          return null;
        }
      } catch (error) {
        console.error('Error processing payment:', error);
        return null;
      }
    } else {
      console.error('✗ Upload failed:', data);
      return null;
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
}

// Run the test
testFileUpload();