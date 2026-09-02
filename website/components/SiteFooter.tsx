import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>Fettle</strong>
        <p>Review local code changes with their context intact.</p>
      </div>
      <div className="footer-links">
        <a href="/docs/getting-started/">Getting started</a>
        <a href="/docs/review-a-change/">Review a change</a>
        <a href="https://github.com/mcclowes/fettle">GitHub</a>
        <Link href="/account">Account</Link>
      </div>
    </footer>
  );
}
