"use client";

import { useState } from "react";
import Image from "next/image";
import { wrapFetchWithPayment } from "x402-fetch";
import { createWalletClient, custom, walletActions, publicActions } from "viem";
import { baseSepolia } from "viem/chains";

declare global {
  interface Window {
    ethereum?: any;
  }
}

type FileType = "image" | "pdf" | "text" | "unknown";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<FileType>("unknown");
  const [textContent, setTextContent] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ url: string; type: FileType; ipfsHash?: string; filename?: string } | null>(null);

  const getFileType = (file: File): FileType => {
    if (file.type.startsWith("image/")) return "image";
    if (file.type === "application/pdf") return "pdf";
    if (file.type === "text/plain" || file.name.endsWith(".txt")) return "text";
    return "unknown";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const type = getFileType(selectedFile);
      setFileType(type);

      const reader = new FileReader();
      
      if (type === "image") {
        reader.onloadend = () => {
          setPreview(reader.result as string);
          setTextContent(null);
        };
        reader.readAsDataURL(selectedFile);
      } else if (type === "text") {
        reader.onloadend = () => {
          const content = reader.result as string;
          setTextContent(content);
          setPreview(null);
        };
        reader.readAsText(selectedFile);
      } else if (type === "pdf") {
        setPreview(null);
        setTextContent(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    try {
      // Check if wallet is available
      if (!window.ethereum) {
        alert("Please install a Web3 wallet like MetaMask");
        setUploading(false);
        return;
      }

      // Request accounts from the wallet
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (!accounts || accounts.length === 0) {
        alert("No wallet accounts available");
        setUploading(false);
        return;
      }

      // Create a wallet client with the connected account
      const walletClient = createWalletClient({
        chain: baseSepolia,
        transport: custom(window.ethereum),
        account: accounts[0] as `0x${string}`,
      }).extend(publicActions).extend(walletActions);

      // Wrap fetch with automatic payment handling
      // @ts-ignore - Type mismatch between viem wallet client and x402-fetch Signer interface
      const fetchWithPayment = wrapFetchWithPayment(fetch, walletClient);

      const formData = new FormData();
      formData.append("file", file);

      // Make the request - x402-fetch will handle 402 responses automatically
      const response = await fetchWithPayment("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadedFile({ url: data.url, type: fileType, ipfsHash: data.ipfsHash, filename: data.filename });
        setFile(null);
        setPreview(null);
        setTextContent(null);
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload error: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <main className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl bg-white dark:bg-black rounded-lg">
          <h2 className="text-4xl font-bold mb-8">Upload a File to IPFS</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-10 h-10 text-gray-400 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {file ? "Click to change file" : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Images, PDF, or Text files
                  </p>
                  {file && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {file.name}
                    </p>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.txt"
                />
              </label>
            </div>

            {(preview || textContent) && (
              <div className="space-y-4">
                {fileType === "image" && preview && (
                  <div className="relative w-full h-64">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                )}
                {fileType === "text" && textContent && (
                  <div className="w-full bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Text Preview:</p>
                    <pre className="text-xs overflow-auto max-h-64 text-gray-700 dark:text-gray-300 font-mono whitespace-pre-wrap break-words">
                      {textContent.substring(0, 1000)}
                      {textContent.length > 1000 && "..."}
                    </pre>
                  </div>
                )}
                {fileType === "pdf" && (
                  <div className="w-full bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center h-64">
                    <div className="text-center">
                      <svg
                        className="w-16 h-16 mx-auto text-red-500 mb-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                      </svg>
                      <p className="text-gray-600 dark:text-gray-400">PDF File Ready</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{file?.name}</p>
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg transition"
                >
                  {uploading ? "Uploading..." : `Upload ${fileType === "text" ? "Text" : fileType === "pdf" ? "PDF" : "Image"}`}
                </button>
              </div>
            )}
          </form>

          {uploadedFile && (
            <div className="mt-8 space-y-4">
              <h2 className="text-2xl font-bold">Upload Successful!</h2>
              <div className="w-full bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">IPFS CID:</p>
                <p className="text-sm font-mono text-blue-700 dark:text-blue-300 break-all">{uploadedFile.ipfsHash}</p>
              </div>
              <div className="w-full bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Filename:</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 break-all">{uploadedFile.filename}</p>
              </div>
              <div className="w-full bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Gateway URL:</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 break-all">
                  <a href={uploadedFile.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                    {uploadedFile.url}
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
