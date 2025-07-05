// app/providers.tsx
"use client";

import { HeroUIProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider enableColorScheme>
        <HeroUIProvider>{children}</HeroUIProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
