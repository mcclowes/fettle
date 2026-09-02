"use client";

import { SignIn, SignUp } from "@clerk/nextjs";
import { AUTH_ENABLED } from "@/lib/auth";

export function AuthCard({ mode }: { mode: "sign-in" | "sign-up" }) {
  if (!AUTH_ENABLED) {
    return (
      <div className="auth-fallback">
        <span className="eyebrow">Account preview</span>
        <h1>{mode === "sign-in" ? "Sign in to Fettle" : "Create your account"}</h1>
        <p>
          Add <code>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> to enable the shared
          Marginal Utility account flow in this deployment.
        </p>
        <a className="button" href="https://kiln.marginalutility.dev">
          Open Kiln account
        </a>
      </div>
    );
  }

  return mode === "sign-in" ? (
    <SignIn routing="hash" forceRedirectUrl="/account" signUpUrl="/account/sign-up" />
  ) : (
    <SignUp routing="hash" forceRedirectUrl="/account" signInUrl="/account/sign-in" />
  );
}
