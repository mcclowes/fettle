import type { Metadata } from "next";
import { AuthCard } from "@/components/AuthCard";

export const metadata: Metadata = { title: "Create account", robots: { index: false, follow: false } };

export default function SignUpPage() {
  return <main className="auth-page"><AuthCard mode="sign-up" /></main>;
}
