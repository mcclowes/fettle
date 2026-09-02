"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { AUTH_ENABLED, CLERK_PUBLISHABLE_KEY } from "@/lib/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  if (!AUTH_ENABLED) return children;

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      appearance={{
        theme: dark,
        variables: {
          colorPrimary: "#d48774",
          colorBackground: "#2c2023",
          colorForeground: "#f5ece9",
          colorMutedForeground: "#c1afb2",
          borderRadius: "12px",
        },
      }}
      signInUrl="/account/sign-in"
      signUpUrl="/account/sign-up"
    >
      {children}
    </ClerkProvider>
  );
}
