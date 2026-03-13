import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mission Controller",
  description: "A personal operating system for calendar, tasks, projects, memory and docs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
