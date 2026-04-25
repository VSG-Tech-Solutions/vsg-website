"use client";

import { Lightning } from "../Lightning";

export const CrimsonBg: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <div className="absolute inset-0 h-[110vh]">
        <Lightning hue={0} xOffset={0} speed={1.3} intensity={0.55} size={2.4} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black" />
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full bg-gradient-radial from-red-600/20 via-red-900/8 to-transparent blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center 40%, black 40%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center 40%, black 40%, transparent 80%)",
        }}
      />
    </div>
  );
};
