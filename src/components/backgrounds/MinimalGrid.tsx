"use client";

export const MinimalGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#fafaf9]">
      {/* Subtle gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fafaf9] to-[#f5f5f4]" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(12,10,9,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse at center 30%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center 30%, black 30%, transparent 80%)",
        }}
      />

      {/* Indigo accent glow */}
      <div
        className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(ellipse, rgba(79,70,229,0.18) 0%, rgba(129,140,248,0.08) 40%, transparent 70%)",
        }}
      />

      {/* Fade bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fafaf9]" />
    </div>
  );
};
