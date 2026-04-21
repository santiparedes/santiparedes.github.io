import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";

const roles = [
  {
    company: "Breadly",
    dateRange: "Aug 2025 – Present",
    role: "Lead Software Engineer (Digital Transformation)",
    location: "Monterrey, NL",
    bullets: [
      "Led the implementation and customization of Odoo ERP to digitalize production, inventory, and sales workflows.",
      "Designed and optimized inventory and manufacturing processes to improve operational efficiency.",
      "Integrated sales, accounting, and logistics modules to reduce manual data entry and operational errors.",
      "Developed internal tools and automations using Python to streamline order processing and reporting.",
      "Collaborated with operations and administrative teams to translate business needs into technical solutions.",
    ],
  },
  {
    company: "Hanova Consulting",
    dateRange: "Apr 2025 – Dec 2025",
    role: "Software Engineering Consultant",
    location: "Monterrey, NL",
    bullets: [
      "Led development of an Insurance Multiquoter and Payment Tracker SaaS using FastAPI and PostgreSQL.",
      "Built RPA-driven, asynchronous workflows to automate insurance quotations, report analysis, and policy delivery.",
      "Reduced quotation times by 3x and eliminated manual policy analysis for client operations.",
    ],
  },
  {
    company: "Student Group FELC",
    dateRange: "May 2021 – May 2022",
    role: "President",
    location: "Monterrey, NL",
    bullets: [
      "Led a student group focused on promoting financial literacy among youth.",
      "Organized events, including a student marketplace and an entrepreneurship lecture by the CEO of Moneypool.",
      "Coordinated cross-functional teams of students to plan initiatives, manage budgets, and drive member engagement.",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section className="max-w-3xl mx-auto px-5 sm:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-base font-semibold text-foreground/60 mb-10 tracking-wide uppercase">
          Experience
        </h2>
        <div className="flex flex-col divide-y divide-foreground/10 border-y border-foreground/10">
          {roles.map((item) => (
            <ExperienceCard
              key={item.company + item.dateRange}
              company={item.company}
              dateRange={item.dateRange}
              role={item.role}
              location={item.location}
              bullets={item.bullets}
              icon={null}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceSection;
