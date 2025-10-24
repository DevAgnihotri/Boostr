import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BOOSTR - Elevate Your Creative Journey",
  description: "Premium crowdfunding platform for visionary creators. Transform your dreams into reality with community-driven funding.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">
        <SessionWrapper> 
          <Navbar />
          <div className="pt-20 min-h-screen bg-slate-950 text-white">
            {children}
          </div>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
