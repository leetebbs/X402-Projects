import { NextRequest, NextResponse } from "next/server";
import { PinataSDK } from "pinata-web3";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT || "",
  pinataGateway: process.env.PINATA_GATEWAY || "",
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Upload to IPFS via Pinata
    const uploadedFile = await pinata.upload.file(file);

    const ipfsUrl = `https://${process.env.PINATA_GATEWAY}/ipfs/${uploadedFile.IpfsHash}`;

    console.log("File uploaded to IPFS:", ipfsUrl);

    return NextResponse.json(
      { 
        url: ipfsUrl, 
        filename: file.name,
        ipfsHash: uploadedFile.IpfsHash,
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
