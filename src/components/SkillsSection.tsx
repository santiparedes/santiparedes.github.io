import { motion } from "framer-motion";

const groups = [
  {
    title: "Languages",
    items: "Python, C/C++, SQL (Postgres), Swift, JavaScript, HTML/CSS",
  },
  {
    title: "Frameworks",
    items: "React, Flask, FastAPI, Node.js (runtime)",
  },
  {
    title: "Libraries",
    items: "NumPy, pandas, scikit-learn, PyTorch, SQLAlchemy, Selenium",
  },
  {
    title: "Developer tools",
    items: "GitHub, Docker, Xcode, Travis CI, VS Code, Cursor, DBeaver, Figma, AWS",
  },
  {
    title: "Soft skills",
    items:
      "Proactive and self-driven; strong team collaboration; clear technical communication; builder mindset",
  },
];

const SkillsSection = () => {
  return (
    <section className="max-w-3xl mx-auto px-5 sm:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-base font-semibold text-foreground/60 mb-8 tracking-wide uppercase">
          Technical skills
        </h2>
        <dl className="space-y-6">
          {groups.map((g) => (
            <div key={g.title}>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/45 mb-2">
                {g.title}
              </dt>
              <dd className="text-sm font-medium leading-relaxed text-foreground/80">{g.items}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
