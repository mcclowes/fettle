import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      {children}
      <SiteFooter />
    </>
  );
}
