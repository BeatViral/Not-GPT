import type { Metadata } from "next";
import "./globals.css";
import { brand } from "@/config/brand";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { SiteHeader } from "@/components/shared/SiteHeader";

export const metadata: Metadata = {
  title: `${brand.productName} + ${brand.gooName}`,
  description:
    "NOT GPT is a clean answer engine that questions source evidence before answering. GOO is an independent opportunity protocol for inventions."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen text-ink antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
