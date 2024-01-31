import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { SearchProvider } from "@/contexts/searchContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "plyGround",
  description: "A digital video games catalog site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gray-950 text-white">
      <body className={inter.className}>
        <SearchProvider>
          <Navbar />
          {children}
          {/* reversedOrder reverses the order of toasts, so that the newest one is at the top */}
          <Toaster position="bottom-right" reverseOrder={true} />
        </SearchProvider>
      </body>
    </html>
  );
}
