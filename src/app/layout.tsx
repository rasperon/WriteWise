import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WriteWise - İngilizce Yazma pratikleri",
  description: "İngilizce yazma becerilerinizi geliştirin",
  authors: [{ name: "rasperon.c" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark:bg-gray-900">
      <body className={`${plusJakarta.className} min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100 via-pink-50 to-white dark:from-gray-900 dark:via-purple-900/20 dark:to-black`}>
        <div className="container mx-auto px-4 py-12">
          {children}
        </div>
      </body>
    </html>
  );
}
