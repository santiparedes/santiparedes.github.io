import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

interface ExperienceCardProps {
  company: string;
  dateRange: string;
  role: string;
  location?: string;
  bullets?: string[];
  link?: string;
  icon?: React.ReactNode;
}

const ExperienceCard = ({
  company,
  dateRange,
  role,
  location,
  bullets,
  link,
}: ExperienceCardProps) => {
  const detailed = Boolean(bullets?.length);

  const inner = (
    <>
      {detailed ? (
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 space-y-1">
              <p className="text-base font-semibold leading-snug text-foreground">{role}</p>
              <p className="text-sm font-medium text-foreground/65">
                {company}
                {location ? ` · ${location}` : ""}
              </p>
            </div>
            {dateRange ? (
              <p className="shrink-0 text-sm font-medium text-foreground/50 sm:pt-0.5 sm:text-right">
                {dateRange}
              </p>
            ) : null}
          </div>
          <ul className="list-disc space-y-2 pl-5 text-sm font-medium leading-relaxed text-foreground/75 marker:text-foreground/35">
            {bullets!.map((b, idx) => (
              <li key={idx}>{b}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-between gap-4">
          <div className="min-w-0 flex flex-col gap-0.5">
            <span className="text-base font-semibold text-foreground">{company}</span>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
              {dateRange ? (
                <>
                  <span className="text-foreground/50 font-medium">{dateRange}</span>
                  <span className="text-foreground/40 hidden sm:inline">·</span>
                </>
              ) : null}
              <span className="text-foreground/65 font-medium">{role}</span>
            </div>
          </div>
          {link ? (
            <ArrowUpRight className="h-5 w-5 shrink-0 text-foreground/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          ) : null}
        </div>
      )}
    </>
  );

  const base = detailed
    ? "group flex w-full flex-col rounded-xl px-4 py-6 sm:px-5 transition-colors duration-200 hover:bg-foreground/[0.04]"
    : "group flex w-full items-center gap-6 rounded-lg px-3 py-3 transition-all duration-200 hover:bg-foreground/5";

  if (link) {
    return (
      <Link to={link} className={`${base} cursor-pointer`}>
        {inner}
      </Link>
    );
  }

  return <div className={base}>{inner}</div>;
};

export default ExperienceCard;
