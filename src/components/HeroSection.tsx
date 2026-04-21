import { motion } from "framer-motion";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="px-5 sm:px-8 pt-24 pb-12 sm:pb-16 max-w-7xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <div className="relative mb-12 sm:mb-16">
          <motion.h1
            variants={itemVariants}
            className="font-display text-[2.35rem] leading-[1.08] sm:text-5xl md:text-7xl lg:text-8xl font-normal text-foreground tracking-tight"
          >
            I&apos;m Santiago Paredes,
            <br />
            <span className="italic">lead software engineer</span>
            <br />
            at Breadly in Monterrey.
          </motion.h1>
        </div>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-foreground/75 font-medium max-w-2xl mt-6 sm:mt-8 ml-0 sm:ml-auto sm:max-w-xl sm:text-right leading-relaxed"
        >
          CS &amp; Technology at ITESM. I ship ERP and internal tools in Python, build
          APIs with FastAPI, and consult on automation-heavy SaaS. Open to collaborations
          that need clear technical communication and fast execution.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
