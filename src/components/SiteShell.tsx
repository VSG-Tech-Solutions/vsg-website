import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PilotPromoBanner } from "./PilotPromoBanner";

/**
 * Shared site chrome — promo banner + Navbar on top, Footer at bottom, page
 * content in between. The OceanBg lives inside the Hero of each page (or the
 * page-level hero banner), so every page can set its own density of ambient
 * depth.
 */
export const SiteShell: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main
      className="relative"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <PilotPromoBanner />
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};
