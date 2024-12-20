import { Merienda } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";

const merienda = Merienda({ subsets: ["latin"] });

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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`overflow-x-hidden ${merienda.className}`}>
        <div>{children}</div>
      </body>
      <Toaster position="top-right" reverseOrder={false} />
    </html>
  );
}
