import "./globals.css";
import Navbar from "./components/navbar";

export const metadata = {
  title: "St.Vincent's Matriculation School",
  description: "Official portal for SVS School",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        {/* The new complex Navbar with dropdowns */}
        <Navbar />
        
        {/* The rest of the page content */}
        {children}
      </body>
    </html>
  );
}