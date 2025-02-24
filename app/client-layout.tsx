// app/client-layout.tsx
"use client"; // This ensures the component is treated as a client-side component.

import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@auth0/nextjs-auth0/client"; // For Auth0 User Context

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </SessionProvider>
  );
}
