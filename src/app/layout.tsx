import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "@/assets/styles/globals.css";
import logo from "@/assets/logo.svg";
import { Providers } from "@/components/providers";
import { APP_DESCRIPTION, APP_NAME } from "@/constants";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  icons: { icon: logo.src },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full font-sans antialiased ${dmSans.variable}`}>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
