import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recursive File Editor",
  description: "A simple file editor that allows you to edit files in a recursive file structure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
