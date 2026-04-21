import { motion } from "framer-motion";

const coursework = [
  "Software Construction and Decision Making",
  "Analysis and Design of Advanced Algorithms",
  "Integration of Cybersecurity in Networks and Software Systems",
];

const EducationSection = () => {
  return (
    <section className="max-w-3xl mx-auto px-5 sm:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-base font-semibold text-foreground/60 mb-8 tracking-wide uppercase">
          Education
        </h2>
        <div className="space-y-3">
          <div>
            <p className="text-base font-semibold text-foreground leading-snug">
              Instituto Tecnológico de Estudios Superiores de Monterrey (ITESM)
            </p>
            <p className="text-sm font-medium text-foreground/65 mt-1">Monterrey, NL</p>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <p className="text-sm font-semibold text-foreground/90">
              Bachelor of Science in Computer Science and Technology
            </p>
            <p className="shrink-0 text-sm font-medium text-foreground/50">May 2023 – May 2027</p>
          </div>
          <div className="pt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/45 mb-3">
              Relevant coursework
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm font-medium leading-relaxed text-foreground/75 marker:text-foreground/35">
              {coursework.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default EducationSection;
