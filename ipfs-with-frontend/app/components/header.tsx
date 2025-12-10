"use client";

import { useState } from "react";

export default function Header() {
  return (
    <header className="w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">X</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              XFile402
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              IPFS Storage with x402 Payments
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <a
            href="/"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
          >
            Home
          </a>
          <a
            href="/about"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
          >
            About
          </a>
        </div>
      </nav>


    </header>
  );
}
