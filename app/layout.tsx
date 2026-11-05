import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { env } from "@/lib/env";

const display = localFont({
  variable: "--font-display", display: "swap",
  src: [
    { path: "./fonts/cormorant-garamond-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-500-italic.woff2", weight: "500", style: "italic" },
  ],
});
const sans = localFont({ variable: "--font-sans", display: "swap", src: "./fonts/jost-latin-wght-normal.woff2", weight: "300 700" });

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: { default: "Dr. Anameka S Panda", template: "%s | Dr. Anameka S Panda" },
  applicationName: "Dr. Anameka S Panda",
  authors: [{ name: "Dr. Anameka S Panda" }],
  formatDetection: { telephone: false },
  ...(env.gscVerification ? { verification: { google: env.gscVerification } } : {}),
};
export const viewport: Viewport = { themeColor: "#441F51", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
