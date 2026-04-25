"use client";

import { useTheme } from "@/themes/ThemeProvider";
import { CrimsonBg } from "./CrimsonBg";
import { Aurora } from "./Aurora";
import { MinimalGrid } from "./MinimalGrid";
import { BrutalistBg } from "./BrutalistBg";
import { SolarBg } from "./SolarBg";
import { EmberBg } from "./EmberBg";
import { MatrixBg } from "./MatrixBg";
import { SynthwaveBg } from "./SynthwaveBg";
import { CosmosBg } from "./CosmosBg";
import { GlitchBg } from "./GlitchBg";
import { HoloBg } from "./HoloBg";
import { QuantumBg } from "./QuantumBg";
import { MidCenturyBg } from "./MidCenturyBg";
import { OceanBg } from "./OceanBg";
import { OrigamiBg } from "./OrigamiBg";
import { NoirBg } from "./NoirBg";

export const HeroBackground: React.FC = () => {
  const { theme } = useTheme();
  switch (theme.bgMode) {
    case "lightning":
      return <CrimsonBg />;
    case "aurora":
      return <Aurora />;
    case "grid":
      return <MinimalGrid />;
    case "brutalist":
      return <BrutalistBg />;
    case "solar":
      return <SolarBg />;
    case "ember":
      return <EmberBg />;
    case "matrix":
      return <MatrixBg />;
    case "synthwave":
      return <SynthwaveBg />;
    case "cosmos":
      return <CosmosBg />;
    case "glitch":
      return <GlitchBg />;
    case "holo":
      return <HoloBg />;
    case "quantum":
      return <QuantumBg />;
    case "midcentury":
      return <MidCenturyBg />;
    case "ocean":
      return <OceanBg />;
    case "origami":
      return <OrigamiBg />;
    case "noir":
      return <NoirBg />;
    default:
      return <OceanBg />;
  }
};
