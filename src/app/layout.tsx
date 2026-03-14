import type { Metadata } from "next";
import { ThemeProvider, themeScript } from "@/components/providers/theme-provider";
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
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
