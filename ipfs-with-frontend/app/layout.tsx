import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "./components/header";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XFile402",
  description: "IPFS Storage with x402 Payments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
