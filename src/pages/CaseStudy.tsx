import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface CaseStudySection {
  title: string;
  content: React.ReactNode;
}

interface CaseStudyData {
  title: string;
  subtitle: string;
  role: string;
  timeline: string;
  team: string;
  overview: React.ReactNode;
  sections: CaseStudySection[];
  externalLink?: {
    text: string;
    url: string;
  };
  gradientClass: string;
}

const caseStudyData: Record<string, CaseStudyData> = {
  explorations: {
    title: "Explorations",
    subtitle:
      "Experiments across web, games, data, and databases—shared openly so others can learn or fork.",
    role: "Software engineer",
    timeline: "Ongoing",
    team: "Solo / collaborators welcome",
    overview: (
      <>
        I&apos;m Santiago Paredes, a{" "}
        <span className="font-semibold text-foreground">software engineer</span> from{" "}
        <span className="font-semibold text-foreground">Monterrey, Mexico</span>. This
        space is where I try ideas in public: interfaces I want to polish, small games,
        data sketches, and anything that helps me grow. If a project is useful, I
        want it documented and reusable for anyone landing here from{" "}
        <span className="font-semibold text-foreground">GitHub</span> or this site.
      </>
    ),
    sections: [
      {
        title: "Web design",
        content: (
          <>
            I care about{" "}
            <span className="font-semibold text-foreground">
              clear layout, readable type, and flows that feel obvious
            </span>
            . Most of what I ship here starts as a small UI experiment before it becomes
            a fuller tool or page you can actually use.
          </>
        ),
      },
      {
        title: "Games & interactivity",
        content: (
          <>
            Game dev is a playground for systems thinking: input, feedback, and pacing.
            I&apos;m interested in{" "}
            <span className="font-semibold text-foreground">
              approachable mechanics
            </span>{" "}
            and projects others can run locally or in the browser.
          </>
        ),
      },
      {
        title: "Data & algorithms",
        content: (
          <>
            I like breaking problems into structures and steps—whether that&apos;s{" "}
            <span className="font-semibold text-foreground">algorithms</span>,{" "}
            <span className="font-semibold text-foreground">analysis</span>, or small
            automation. Demos here tend to pair code with a short write-up so the
            &quot;why&quot; is as clear as the &quot;what&quot;.
          </>
        ),
      },
      {
        title: "Databases",
        content: (
          <>
            Good software needs trustworthy data. I practice{" "}
            <span className="font-semibold text-foreground">
              modeling, migrations, and sane queries
            </span>{" "}
            so features stay fast and honest as they grow.
          </>
        ),
      },
    ],
    externalLink: {
      text: "github.com/santiparedes",
      url: "https://github.com/santiparedes",
    },
    gradientClass: "from-orange-500/25 via-amber-500/15 to-rose-500/25",
  },
};

interface CaseStudyProps {
  slug: string;
}

const CaseStudy = ({ slug }: CaseStudyProps) => {
  const data = caseStudyData[slug] ?? caseStudyData.explorations;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="min-h-screen py-32 px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[640px] mx-auto"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight font-display"
          >
            {data.title}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-foreground/70 font-medium mb-12 leading-relaxed"
          >
            {data.subtitle}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-6 mb-16 py-8 border-y border-foreground/10"
          >
            <div>
              <p className="text-sm text-foreground/50 mb-1 uppercase tracking-wide">Role</p>
              <p className="text-foreground font-medium">{data.role}</p>
            </div>
            <div>
              <p className="text-sm text-foreground/50 mb-1 uppercase tracking-wide">Timeline</p>
              <p className="text-foreground font-medium">{data.timeline}</p>
            </div>
            <div>
              <p className="text-sm text-foreground/50 mb-1 uppercase tracking-wide">Team</p>
              <p className="text-foreground font-medium">{data.team}</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-sm text-foreground/50 mb-4 uppercase tracking-wide">Overview</h2>
            <p className="text-body text-foreground/75 font-medium leading-relaxed">{data.overview}</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mb-16 aspect-[16/10] rounded-xl overflow-hidden border border-foreground/10"
          >
            <div
              className={`w-full h-full bg-gradient-to-br ${data.gradientClass} flex items-center justify-center`}
            >
              <div className="text-foreground/35 text-sm font-medium px-6 text-center">
                Screenshots and embeds for each exploration will live here.
              </div>
            </div>
          </motion.div>

          {data.sections.map((section, index) => (
            <motion.div key={section.title} variants={itemVariants} className="mb-12">
              <h3 className="text-lg font-semibold text-foreground mb-4">{section.title}</h3>
              <p className="text-body text-foreground/75 font-medium leading-relaxed">{section.content}</p>

              {index < 2 && (
                <div className="mt-8 aspect-video rounded-xl overflow-hidden border border-foreground/10">
                  <div
                    className={`w-full h-full bg-gradient-to-br ${data.gradientClass} opacity-60 flex items-center justify-center`}
                  >
                    <div className="text-foreground/35 text-sm font-medium px-4 text-center">
                      {section.title} — visual placeholder
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}

          {data.externalLink && (
            <motion.div variants={itemVariants} className="pt-8 border-t border-foreground/10">
              <a
                href={data.externalLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-foreground font-medium hover:text-foreground/70 transition-colors duration-200"
              >
                Visit {data.externalLink.text}
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
      <Footer />
    </main>
  );
};

export default CaseStudy;
