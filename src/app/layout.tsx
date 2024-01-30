import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { SearchProvider } from "@/contexts/searchContext";

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
        </SearchProvider>
      </body>
    </html>
  );
}
