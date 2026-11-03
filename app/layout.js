import "./globals.css";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import { StoreProvider } from "@/lib/store";
import { SCHOOL_NAME } from "@/lib/config";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const body = Figtree({ subsets: ["latin"], variable: "--font-body" });

export const metadata = {
  title: `${SCHOOL_NAME} · School management`,
  description: "Manage students, teachers, classes, attendance and fees.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <StoreProvider>
          <div className="shell">
            <Sidebar />
            <main className="main">{children}</main>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
