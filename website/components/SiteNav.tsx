"use client";

import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import { AUTH_ENABLED } from "@/lib/auth";

export function SiteNav() {
  const [hidden, setHidden] = useState(false);
  const previousScrollY = useRef(0);

  useEffect(() => {
    previousScrollY.current = window.scrollY;

    const updateVisibility = () => {
      const scrollY = window.scrollY;
      setHidden(scrollY > 80 && scrollY > previousScrollY.current);
      previousScrollY.current = scrollY;
    };

    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <header className={`site-nav${hidden ? " site-nav-hidden" : ""}`}>
      <nav className="nav-inner" aria-label="Primary">
        <Link className="brand" href="/">
          <Image src="/logo.svg" width={126} height={30} alt="Fettle" priority />
        </Link>
        <div className="nav-links">
          <a href="/docs/">Docs</a>
          <a href="https://github.com/mcclowes/fettle">GitHub</a>
          {AUTH_ENABLED ? (
            <>
              <SignedOut>
                <Link href="/account/sign-in">Sign in</Link>
                <Link className="button small" href="/account/sign-up">Create account</Link>
              </SignedOut>
              <SignedIn>
                <Link href="/account">Account</Link>
                <UserButton />
              </SignedIn>
            </>
          ) : (
            <Link href="/account/sign-in">Sign in</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
