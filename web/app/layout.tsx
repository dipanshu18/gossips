import type { Metadata } from "next";
import { AR_One_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";

const arOneSans = AR_One_Sans({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Gossips",
  description: "Realtime chat app with dms and group chats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={arOneSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col justify-between bg-slate-300 dark:bg-slate-950">
            <Navbar />
            <div>{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
