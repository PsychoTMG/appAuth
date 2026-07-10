import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./provider/ClientLayout";


export const metadata: Metadata = {
  title: "Auth/app",
  description: "meow-meow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
