import { Inter } from "next/font/google";
import "./globals.css";
import AdminSidebar from "@/components/admin/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bakery Web App - Admin panel",
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
        <AdminSidebar>{children}</AdminSidebar>
      </body>
    </html>
  );
}
