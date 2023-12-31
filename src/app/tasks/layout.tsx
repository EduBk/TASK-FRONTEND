import "./scroll.css";
import Header from "@/components/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <div className="min-w-full min-h-full">{children}</div>
      </body>
    </html>
  );
}
