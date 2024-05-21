import type { Metadata } from "next";
import { Providers } from "./providers";
import { ClientOnly } from "./ClientOnly";
import "./globals.css";

export const metadata: Metadata = {
  title: "带着Mortal看世界",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark">
      <body className="p-4">
        <Providers>
          <ClientOnly>{children}</ClientOnly>
        </Providers>
      </body>
    </html>
  );
}
