import type { Metadata } from "next";
import SessionWrapper from "@/components/session-wrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nex",
  description: "Nex is fullstack framework",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body
          className={`antialiased`}
        >
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
