import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Youn Yusuff — Product Designer & Builder",
  description: "Selected work, side quests, and experiments by Youn Yusuff, a product designer and builder in Kuala Lumpur.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
