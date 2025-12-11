"use client";

import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { I18nProvider } from "@/context/I18nContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <I18nProvider>
          <SessionProvider>
            <Navbar />
            {children}
          </SessionProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
