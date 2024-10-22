import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bakery Web App",
  description: "3rd year Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>{children}</div>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
