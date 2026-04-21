import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-2 xl:grid-cols-12 xl:gap-x-10 xl:gap-y-0">
          <div className="min-w-0 xl:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/50 mb-4">
              Contact
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:santiparedes738@gmail.com"
                className="text-sm sm:text-[15px] text-foreground/80 font-medium hover:text-foreground transition-colors break-all sm:break-words leading-snug"
              >
                santiparedes738@gmail.com
              </a>
              <a
                href="tel:+528125700320"
                className="text-sm sm:text-[15px] text-foreground/80 font-medium hover:text-foreground transition-colors w-fit"
              >
                +52 812 570 0320
              </a>
            </div>
          </div>

          <div className="min-w-0 xl:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/50 mb-4">
              Social
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.linkedin.com/in/santiparedes/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-[15px] text-foreground/80 font-medium hover:text-foreground transition-colors w-fit"
              >
                linkedin.com/in/santiparedes
              </a>
              <a
                href="https://github.com/santiparedes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-[15px] text-foreground/80 font-medium hover:text-foreground transition-colors w-fit"
              >
                github.com/santiparedes
              </a>
            </div>
          </div>

          <div className="min-w-0 xl:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/50 mb-4">
              Other
            </h3>
            <a
              href="https://github.com/santiparedes?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm sm:text-[15px] text-foreground/80 font-medium hover:text-foreground transition-colors inline-block"
            >
              Repositories & code
            </a>
          </div>

          <div className="flex min-w-0 items-start pt-1 xl:col-span-2 xl:justify-end xl:pt-8">
            <a
              href="#experience"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/90 hover:text-foreground transition-colors group"
            >
              Experience
              <ArrowDown className="h-4 w-4 opacity-70 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
