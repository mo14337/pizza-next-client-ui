import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import Refresher from "@/components/custom/Refresher";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          manrope.variable,
          " min-h-screen bg-background font-manrope antialiased"
        )}
      >
        <Refresher>{children}</Refresher>
        <Toaster />
      </body>
    </html>
  );
}
