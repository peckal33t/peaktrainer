import type { Metadata } from "next";
import { Plus_Jakarta_Sans as Font } from "next/font/google";
import { cn } from "@/lib/utilities";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const appFont = Font({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "PeakTrainer",
  description:
    "A personal trainer management app designed to streamline scheduling, client tracking, and session management.",
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
          "min-h-screen bg-dark-400 font-sans antialiased",
          appFont.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
