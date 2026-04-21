import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="max-w-3xl mx-auto px-5 sm:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-base font-semibold text-foreground/60 mb-8 tracking-wide uppercase">
          About
        </h2>
        <div className="flex flex-col gap-5">
          <p className="text-body text-foreground/75 font-medium">
            I approach work with integrity and a proactive mindset—whether that&apos;s
            leading an Odoo rollout, designing async workflows for insurance tech, or
            coordinating teams around a shared goal.
          </p>
          <p className="text-body text-foreground/75 font-medium">
            I value empathy, clear communication, and continuous learning. I care about
            shipping systems that operations teams can actually rely on, and about
            leaving code and documentation in shape for the next person.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
