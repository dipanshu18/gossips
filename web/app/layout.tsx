import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Gossips",
  description: "Realtime scalable chat app with dms and group chats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="antialiased h-screen flex flex-col justify-between">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <div className="flex-1">{children}</div>
            <Toaster richColors visibleToasts={10} />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
