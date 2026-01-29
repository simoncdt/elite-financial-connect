import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, TrendingUp, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { AppointmentModal } from "./AppointmentModal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
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
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-accent px-8 py-4 text-base gap-2 w-full sm:w-auto shadow-lg"
              >
                <Calendar className="w-5 h-5" />
                <span>Prendre rendez-vous</span>
              </button>
              <Link
                to="/equipe"
                className="btn-primary px-8 py-4 text-base gap-2 w-full sm:w-auto"
              >
                <span>Rencontrer l'équipe</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
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
        </div>
      </section>

      <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
