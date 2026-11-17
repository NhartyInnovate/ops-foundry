import React from 'react';

interface AbstractBrandGeometryProps {
  variant?: 'hero' | 'cta' | 'subtle';
  className?: string;
}

export function AbstractBrandGeometry({
  variant = 'hero',
  className = '',
}: AbstractBrandGeometryProps) {
  if (variant === 'hero') {
    return (
      <div
        className={`pointer-events-none absolute inset-0 select-none ${className}`}
        aria-hidden="true"
      >
        {/* 1. Subtle, ethereal ambient glow in the upper-right canvas */}
        <div
          className="absolute -top-20 -right-20 w-[450px] sm:w-[600px] lg:w-[750px] h-[350px] sm:h-[450px] lg:h-[550px] rounded-full opacity-60 blur-3xl pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 70% 30%, rgba(120, 71, 255, 0.14) 0%, rgba(255, 74, 220, 0.08) 45%, rgba(10, 140, 255, 0.04) 75%, transparent 85%)',
          }}
        />

        {/* 2. Primary flowing brand gradient shape emerging organically behind the woman */}
        <div className="absolute right-6 sm:right-8 lg:right-12 bottom-0 w-[320px] sm:w-[440px] md:w-[560px] lg:w-[680px] xl:w-[780px] h-[260px] sm:h-[340px] md:h-[420px] lg:h-[500px] xl:h-[560px]">
          <svg
            viewBox="0 0 780 540"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Flowing multi-stop brand gradient: Blue -> Purple -> Magenta -> Pink -> Coral */}
              <linearGradient
                id="hero-flow-gradient"
                x1="60"
                y1="520"
                x2="720"
                y2="80"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#0A8CFF" />
                <stop offset="24%" stopColor="#5B42F3" />
                <stop offset="48%" stopColor="#7847FF" />
                <stop offset="70%" stopColor="#D946EF" />
                <stop offset="88%" stopColor="#FF4ADC" />
                <stop offset="100%" stopColor="#FF6B99" />
              </linearGradient>

              {/* Atmospheric diffusion filters for soft, luminous edges */}
              <filter id="hero-flow-glow-wide" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="44" />
              </filter>
              <filter id="hero-flow-glow-soft" x="-25%" y="-25%" width="150%" height="150%">
                <feGaussianBlur stdDeviation="20" />
              </filter>
              <filter id="hero-flow-glow-core" x="-15%" y="-15%" width="130%" height="130%">
                <feGaussianBlur stdDeviation="8" />
              </filter>
            </defs>

            {/* Layer A: Wide atmospheric ambient glow (melts smoothly into the white background) */}
            <path
              d="M 30 540 C 110 480, 230 370, 370 270 C 490 180, 610 130, 780 100 L 780 540 Z"
              fill="url(#hero-flow-gradient)"
              filter="url(#hero-flow-glow-wide)"
              opacity="0.50"
            />

            {/* Layer B: Soft edge diffusion (creates smooth organic curvature) */}
            <path
              d="M 50 540 C 130 480, 250 380, 385 280 C 505 190, 625 140, 780 115 L 780 540 Z"
              fill="url(#hero-flow-gradient)"
              filter="url(#hero-flow-glow-soft)"
              opacity="0.65"
            />

            {/* Layer C: Core luminous gradient body */}
            <path
              d="M 70 540 C 150 485, 270 385, 395 285 C 515 200, 635 150, 780 130 L 780 540 Z"
              fill="url(#hero-flow-gradient)"
              filter="url(#hero-flow-glow-core)"
              opacity="0.80"
            />
          </svg>
        </div>
      </div>
    );
  }

  if (variant === 'cta') {
    return (
      <div
        className={`pointer-events-none absolute right-0 bottom-0 select-none overflow-hidden w-[260px] sm:w-[340px] md:w-[420px] lg:w-[500px] xl:w-[560px] h-[175px] sm:h-[225px] md:h-[280px] lg:h-[335px] xl:h-[375px] ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 540 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <defs>
            {/* Brand Gradient: Orange (#FF8C56) -> Pink (#FF4ADC) -> Purple (#7847FF) -> Blue (#0A8CFF) smoothly travelling along the visible hexagonal contour */}
            <linearGradient
              id="cta-hex-gradient"
              x1="220"
              y1="280"
              x2="560"
              y2="140"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FF8C56" />
              <stop offset="18%" stopColor="#FF8C56" />
              <stop offset="38%" stopColor="#FF7098" />
              <stop offset="52%" stopColor="#FF4ADC" />
              <stop offset="72%" stopColor="#7847FF" />
              <stop offset="88%" stopColor="#3D78FF" />
              <stop offset="100%" stopColor="#0A8CFF" />
            </linearGradient>

            {/* Translucent Surface: Predominantly white with gentle cool neutral gradation */}
            <linearGradient
              id="cta-hex-surface"
              x1="220"
              y1="95"
              x2="560"
              y2="360"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.88" />
              <stop offset="45%" stopColor="#FAFBFD" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#F2F5FB" stopOpacity="0.55" />
            </linearGradient>

            {/* Diffused illumination filters (layered soft glow, no harsh wireframe) */}
            <filter id="cta-hex-ambient-blur" x="-20%" y="-20%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="22" />
            </filter>
            <filter id="cta-hex-edge-blur" x="-20%" y="-20%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="5.5" />
            </filter>
            <filter id="cta-hex-feather" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="1.2" />
            </filter>
            <filter id="cta-hex-plate-shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="-4" dy="10" stdDeviation="18" floodColor="#0B0F24" floodOpacity="0.02" />
            </filter>

            {/* Clip path for soft inner edge diffusion */}
            <clipPath id="cta-hex-plate-clip">
              <path d="M 220.0 380.0 L 220.0 266.5 A 32 32 0 0 1 236.0 238.8 L 465.0 106.5 A 40 40 0 0 1 505.0 106.5 L 565.0 141.2 L 565 380 L 220.0 380 Z" />
            </clipPath>
          </defs>

          {/* 1. Translucent Hexagonal Surface Plate */}
          <path
            d="M 220.0 380.0 L 220.0 266.5 A 32 32 0 0 1 236.0 238.8 L 465.0 106.5 A 40 40 0 0 1 505.0 106.5 L 565.0 141.2 L 565 380 L 220.0 380 Z"
            fill="url(#cta-hex-surface)"
            filter="url(#cta-hex-plate-shadow)"
          />

          {/* 2. Soft Inner Light Spill (clipped to the surface plate) */}
          <path
            d="M 220.0 380.0 L 220.0 266.5 A 32 32 0 0 1 236.0 238.8 L 465.0 106.5 A 40 40 0 0 1 505.0 106.5 L 565.0 141.2"
            fill="none"
            stroke="url(#cta-hex-gradient)"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.22"
            filter="url(#cta-hex-edge-blur)"
            clipPath="url(#cta-hex-plate-clip)"
          />

          {/* 3. Wide Diffused Ambient Illumination */}
          <path
            d="M 220.0 380.0 L 220.0 266.5 A 32 32 0 0 1 236.0 238.8 L 465.0 106.5 A 40 40 0 0 1 505.0 106.5 L 565.0 141.2"
            fill="none"
            stroke="url(#cta-hex-gradient)"
            strokeWidth="32"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.28"
            filter="url(#cta-hex-ambient-blur)"
          />

          {/* 4. Medium Edge Glow */}
          <path
            d="M 220.0 380.0 L 220.0 266.5 A 32 32 0 0 1 236.0 238.8 L 465.0 106.5 A 40 40 0 0 1 505.0 106.5 L 565.0 141.2"
            fill="none"
            stroke="url(#cta-hex-gradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.40"
            filter="url(#cta-hex-edge-blur)"
          />

          {/* 5. Subtle Feathered Boundary Light (Soft luminous edge, not a harsh wireframe) */}
          <path
            d="M 220.0 380.0 L 220.0 266.5 A 32 32 0 0 1 236.0 238.8 L 465.0 106.5 A 40 40 0 0 1 505.0 106.5 L 565.0 141.2"
            fill="none"
            stroke="url(#cta-hex-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.65"
            filter="url(#cta-hex-feather)"
          />
        </svg>
      </div>
    );
  }

  // Subtle variant for subpages
  return (
    <div
      className={`pointer-events-none absolute right-0 bottom-0 select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 460 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[260px] sm:w-[340px] lg:w-[420px] h-auto translate-x-8 translate-y-8"
      >
        <defs>
          <linearGradient
            id="subtle-curve-gradient"
            x1="60"
            y1="320"
            x2="420"
            y2="40"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FF8C56" />
            <stop offset="50%" stopColor="#FF4ADC" />
            <stop offset="100%" stopColor="#6B3CF4" />
          </linearGradient>
        </defs>

        <path
          d="M 460 310
             C 360 310, 290 270, 250 200
             C 210 130, 230 60, 300 20
             C 360 -15, 420 10, 440 65"
          stroke="url(#subtle-curve-gradient)"
          strokeWidth="36"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.75"
        />

        <g transform="translate(90, 70)" stroke="#0B0F24" strokeWidth="1.25" fill="none" opacity="0.1">
          <path
            d="M 35 0 L 70 20.21 L 70 60.62 L 35 80.83 L 0 60.62 L 0 20.21 Z"
            strokeDasharray="8 6"
          />
        </g>
      </svg>
    </div>
  );
}
