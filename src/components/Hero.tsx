import { motion } from "framer-motion";
import { ArrowRight, Shield, TrendingUp, Users } from "lucide-react";

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-navy-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="relative z-10 section-container pt-32 pb-20 lg:pt-40 lg:pb-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-muted-foreground text-sm font-medium">
              <Shield className="w-4 h-4 text-gold-500" />
              <span>Conseillers financiers certifiés au Canada</span>
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 variants={itemVariants} className="mb-6">
            <span className="block text-foreground">Votre avenir financier,</span>
            <span className="block text-foreground">
              simplifié avec{" "}
              <span className="text-gradient-gold">excellence</span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Une équipe de conseillers dévoués à transformer la complexité de vos finances 
            en une stratégie claire, personnalisée et performante.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a
              href="#contact"
              className="btn-primary px-8 py-4 text-base gap-2 w-full sm:w-auto"
            >
              <span>Consultation gratuite</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#services"
              className="btn-secondary px-8 py-4 text-base w-full sm:w-auto"
            >
              Découvrir nos services
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto"
          >
            {[
              { icon: Users, value: "500+", label: "Clients accompagnés" },
              { icon: TrendingUp, value: "15+", label: "Années d'expertise" },
              { icon: Shield, value: "100%", label: "Confidentialité" },
            ].map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors duration-300"
              >
                <stat.icon className="w-6 h-6 text-gold-500 mb-3" />
                <span className="text-3xl font-semibold text-foreground mb-1">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
        >
          <motion.a
            href="#services"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs tracking-widest uppercase mb-2">Découvrir</span>
            <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1.5">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-current"
              />
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
