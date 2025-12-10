"use client";

export default function About() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <main className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl">
          {/* Hero Section */}
          <div className="mb-16">
            <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              About XFile402
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              XFile402 is a revolutionary decentralized file storage platform that combines the power of IPFS (InterPlanetary File System) with the innovative x402 payment protocol. We're making it simple for anyone to store files permanently and securely on a global, distributed network.
            </p>
          </div>

          {/* Mission Section */}
          <section className="mb-16 bg-white dark:bg-gray-900 rounded-lg p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Our Mission
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To democratize decentralized storage by providing an intuitive, Web3-native platform that makes it easy for anyone to upload, store, and access files on IPFS without technical barriers. We believe in a future where data ownership is transparent, payments are fair, and storage is truly decentralized.
            </p>
          </section>

          {/* Key Features Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              Why XFile402?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                  Decentralized Storage
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your files are stored on IPFS, a peer-to-peer network that ensures your data is resilient, redundant, and never controlled by a single entity.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                  Fair Payments
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  The x402 protocol enables transparent, peer-to-peer payments. Pay only for what you use with no middleman taking a cut.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                  Web3 Native
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Built on blockchain technology, all transactions are transparent, immutable, and verified on-chain for complete trust.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">4</span>
                  Easy to Use
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Simple, intuitive interface that works with any Web3 wallet. No technical knowledge required to get started.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">5</span>
                  Content Addressing
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Every file gets a unique IPFS hash (CID). Access your files from anywhere using content-based addressing.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">6</span>
                  No Setup Required
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  No need to sign up with IPFS providers, generate API keys, or set up your own infrastructure. Just upload and pay.
                </p>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="mb-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-8 border border-blue-200 dark:border-blue-800">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              How It Works
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-600 text-white font-bold">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Select Your File
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Choose any file you want to upload (image, PDF, text, or JSON)
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-600 text-white font-bold">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Connect Your Wallet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Link your Web3 wallet (MetaMask or compatible) for secure transactions
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-600 text-white font-bold">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Automatic Payment
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    x402 protocol handles payment automatically using your wallet
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-600 text-white font-bold">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    File on IPFS
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your file is uploaded to IPFS and pinned for permanent availability
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-600 text-white font-bold">
                    5
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Get Your CID
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Receive your unique content identifier (CID) to access or share your file
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Technology Stack Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              Built With Modern Technology
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { name: "Next.js", desc: "React framework" },
                { name: "TypeScript", desc: "Type safety" },
                { name: "Tailwind CSS", desc: "Styling" },
                { name: "IPFS", desc: "Storage" },
                { name: "Pinata", desc: "IPFS gateway" },
                { name: "Viem", desc: "Web3 toolkit" },
                { name: "x402", desc: "Payment protocol" },
                { name: "Base Sepolia", desc: "Testnet" },
              ].map((tech) => (
                <div key={tech.name} className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800 text-center">
                  <p className="font-semibold text-gray-900 dark:text-white">{tech.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{tech.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-blue-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Store Files Decentralized?
            </h2>
            <p className="text-lg mb-8 text-blue-100">
              Start uploading your files to IPFS with secure Web3 payments today.
            </p>
            <a
              href="/"
              className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition"
            >
              Go to Upload
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}
