import AdminSidebar from "@/components/admin/sidebar";

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
      </body>
    </html>
  );
}
