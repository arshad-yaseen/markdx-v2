import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "@/styles/global.css";

const inter = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MarkDX",
  description:
    "MarkDX is an open source AI markdown editor, which can help you write markdown documents more efficiently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
