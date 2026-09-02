"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserProfile } from "@clerk/nextjs";
import { AUTH_ENABLED } from "@/lib/auth";

export default function AccountPage() {
  if (!AUTH_ENABLED) {
    return <main className="auth-page"><div className="auth-fallback"><span className="eyebrow">Account</span><h1>Your Fettle account</h1><p>Configure Clerk to manage your profile and shared Marginal Utility identity here.</p></div></main>;
  }

  return (
    <main className="account-page">
      <SignedOut><div className="auth-fallback"><h1>Sign in to continue</h1><Link className="button" href="/account/sign-in">Sign in</Link></div></SignedOut>
      <SignedIn><UserProfile routing="hash" /></SignedIn>
    </main>
  );
}
