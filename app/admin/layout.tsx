import AdminSidebar from "@/components/admin/sidebar";
import { Toaster } from "react-hot-toast";

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
      <body>
        <AdminSidebar>{children}</AdminSidebar>
        {/* <Toaster position="top-right" reverseOrder={false} /> */}
      </body>
    </html>
  );
}
