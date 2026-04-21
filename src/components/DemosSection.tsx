import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

type Demo = {
  title: string;
  description: string;
  link: string;
};

const demos: Demo[] = [
  {
    title: "Insurance Multiquoter & Payment Tracker",
    description:
      "FastAPI + PostgreSQL SaaS: async REST APIs orchestrating RPAs for quotations, policy PDFs, and webhooks—cutting quote time by 3× and removing manual report review.",
    link: "/explorations",
  },
  {
    title: "Cora — AI glucose management",
    description:
      "SwiftUI iOS app with Supabase: glucose tracking, nutrition guidance, and supervisor workflows. 2nd place, Swift Challenge Fest.",
    link: "/explorations",
  },
];

const FOLDER_HEIGHT = 308;
const STACK_OFFSET = 52;
const LIFT = 36;

const BORDER = "hsl(25 22% 18% / 0.14)";

const DemosSection = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  const total = demos.length;
  const stackHeight = (total - 1) * STACK_OFFSET + FOLDER_HEIGHT;

  return (
    <section id="projects" className="max-w-5xl mx-auto px-4 sm:px-8 py-20 sm:py-28">
      <header className="mb-14 sm:mb-16 max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/50 mb-3">
          Projects
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.15] text-foreground tracking-tight">
          Selected builds
        </h2>
        <p className="mt-4 text-base text-foreground/65 font-medium leading-relaxed max-w-lg">
          Hover a tab to bring a folder forward. More write-ups and links will live on
          the explorations page as I publish them.
        </p>
      </header>

      <div
        className="relative mx-auto max-w-[min(100%,40rem)]"
        style={{ perspective: "1500px", height: `${stackHeight + 56}px` }}
      >
        <div
          className="pointer-events-none absolute inset-x-[5%] bottom-4 h-28 rounded-[100%] opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(25 45% 12% / 0.28) 0%, transparent 72%)",
          }}
        />

        {demos.map((demo, i) => {
          const isHovered = hovered === i;
          const isFront = i === total - 1;
          const showContent = isHovered || isFront;
          const depth = total - 1 - i;
          const z =
            hovered === null ? i : isHovered ? 80 : Math.min(i, 40 - depth);

          const gradId = `folder-tab-grad-${i}`;
          const bodyGradId = `folder-body-grad-${i}`;

          /**
           * Full-width tab: straight slant on the left, flat top, standard quarter-circle
           * top-right (same logical radius as rounded-2xl ≈ 1rem ≈ 16px at ~400px width → ~4 in 100 viewBox).
           * Bottom edge is a straight line — flush with folder body (single outer card).
           */
          const TAB_H = 52;
          const VIEW_W = 100;
          const VIEW_H = 52;
          const slantTopX = 24;
          const cornerR = 4;
          const flatTopEnd = VIEW_W - cornerR;
          const tabPath = `M 0 ${VIEW_H} L ${slantTopX} 0 L ${flatTopEnd} 0 A ${cornerR} ${cornerR} 0 0 1 ${VIEW_W} ${cornerR} L ${VIEW_W} ${VIEW_H} Z`;

          return (
            <Link
              key={demo.title}
              to={demo.link}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="folder-card group absolute left-0 right-0 block outline-none focus-visible:ring-2 focus-visible:ring-foreground/35 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              style={{
                top: `${i * STACK_OFFSET}px`,
                zIndex: z,
              }}
            >
              <div
                className="relative transition-[transform,filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
                style={{
                  transform: isHovered
                    ? `translateY(-${LIFT}px) rotateX(0.5deg) scale(1.012)`
                    : `translateY(0) rotateX(${4.5 + depth * 0.65}deg) scale(${1 - depth * 0.006})`,
                  transformOrigin: "bottom center",
                  transformStyle: "preserve-3d",
                  filter:
                    hovered !== null && !isHovered
                      ? "brightness(0.96) saturate(0.94)"
                      : undefined,
                  boxShadow: isHovered
                    ? "0 28px 56px -14px hsl(25 42% 8% / 0.2), 0 10px 24px -10px hsl(25 40% 10% / 0.1)"
                    : `0 ${12 + depth * 5}px ${32 + depth * 10}px -${12 + depth}px hsl(25 38% 10% / ${0.12 + depth * 0.02})`,
                }}
              >
                {/* One shell: tab + body share edges (no stepped top-right) */}
                <div
                  className="overflow-hidden rounded-2xl border bg-transparent transition-[border-color] duration-300"
                  style={{
                    borderColor: isHovered ? "hsl(25 22% 18% / 0.22)" : BORDER,
                  }}
                >
                  {/* Tab — full width, slanted left, circular top-right */}
                  <div
                    className="relative w-full"
                    style={{
                      height: TAB_H,
                      filter: isHovered
                        ? "drop-shadow(0 2px 8px hsl(25 40% 8% / 0.06))"
                        : undefined,
                    }}
                  >
                    <svg
                      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                      preserveAspectRatio="none"
                      className="absolute inset-0 h-full w-full"
                      aria-hidden
                    >
                      <defs>
                        <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="hsl(38 38% 99.4%)" />
                          <stop offset="55%" stopColor="hsl(36 32% 97.5%)" />
                          <stop offset="100%" stopColor="hsl(34 28% 96%)" />
                        </linearGradient>
                      </defs>
                      <path d={tabPath} fill={`url(#${gradId})`} />
                    </svg>

                    <div className="absolute inset-0 flex items-center gap-3 pl-14 pr-4 sm:pl-[4.25rem] sm:pr-5">
                      <span className="min-w-0 flex-1 font-sans text-left text-[13px] font-semibold leading-snug tracking-[-0.02em] text-foreground/90 sm:text-sm">
                        <span className="block line-clamp-2 text-balance">{demo.title}</span>
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border shadow-sm transition-all duration-300 ${
                          isHovered
                            ? "border-foreground/20 bg-white/90 text-foreground shadow-md"
                            : "border-foreground/12 bg-white/60 text-foreground/55"
                        }`}
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.25} />
                      </span>
                    </div>
                  </div>

                  {/* Body — same width, no extra top corner radius */}
                  <div
                    className="relative overflow-hidden px-7 pb-9 pt-6 sm:px-9 sm:pt-7"
                    style={{
                      height: `${FOLDER_HEIGHT}px`,
                      boxShadow:
                        "inset 0 1px 0 0 hsl(0 0% 100% / 0.85), inset 0 -20px 40px -36px hsl(30 28% 90% / 0.22)",
                    }}
                  >
                    <svg
                      className="pointer-events-none absolute inset-0 h-full w-full"
                      preserveAspectRatio="none"
                      aria-hidden
                    >
                      <defs>
                        <linearGradient id={bodyGradId} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="hsl(38 36% 99%)" />
                          <stop offset="42%" stopColor="hsl(36 28% 97%)" />
                          <stop offset="100%" stopColor="hsl(32 22% 94%)" />
                        </linearGradient>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#${bodyGradId})`} />
                    </svg>

                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.38]"
                      style={{
                        background:
                          "linear-gradient(118deg, transparent 32%, hsl(0 0% 100% / 0.5) 50%, transparent 64%)",
                      }}
                    />

                    <div
                      className={`relative transition-opacity duration-300 ease-out ${
                        showContent ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <p className="max-w-xl font-sans text-[15px] font-medium leading-relaxed tracking-[-0.015em] text-foreground/75 sm:text-base line-clamp-4 sm:line-clamp-3">
                        {demo.description}
                      </p>
                      <div className="mt-7 flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/42 transition-colors group-hover:text-foreground/55">
                        <span>Details</span>
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                          →
                        </span>
                      </div>
                    </div>

                    <div
                      className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/12 to-transparent"
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute left-0 top-0 h-24 w-full bg-gradient-to-b from-white/3 to-transparent"
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default DemosSection;
