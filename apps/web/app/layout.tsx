import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const courier = Courier_Prime({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gossips",
  description:
    "A chat app that has features like one-to-one chat and group chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={courier.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
