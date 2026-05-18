import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PilotPromoBanner } from "./PilotPromoBanner";
import { ScrollProgress } from "./ScrollProgress";
import { ThemePicker } from "./ThemePicker";

/**
 * SiteShell — global chrome.
 *
 * Matte mono direction: solid var(--bg) background, no global aura layer,
 * no cursor glow. Single saturated element on the page is the white CTA pill;
 * everything else is grayscale.
 *
 * Lenis (SmoothScrollProvider) is INTENTIONALLY OFF for now — it was
 * intercepting wheel events and causing the scroll to feel locked, especially
 * after hot-reloads in dev. Native scroll is faster, less code, and never
 * fights useScroll/whileInView observers. Re-enable later only if there's a
 * specific section that needs scroll-pinned momentum.
 */
export const SiteShell: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main
      className="relative"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <ScrollProgress />
      <PilotPromoBanner />
      <Navbar />
      {children}
      <Footer />
      <ThemePicker />
    </main>
  );
};
