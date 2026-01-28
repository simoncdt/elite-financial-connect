import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Briefcase, 
  PiggyBank, 
  Shield, 
  TrendingUp, 
  Home, 
  GraduationCap,
  ArrowRight 
} from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Assurance Vie",
    description: "Protection financière complète pour vous et vos proches, avec des solutions adaptées à chaque étape de votre vie.",
  },
  {
    icon: PiggyBank,
    title: "Épargne & Placements",
    description: "Stratégies d'investissement personnalisées pour faire fructifier votre patrimoine selon vos objectifs.",
  },
  {
    icon: TrendingUp,
    title: "Planification Retraite",
    description: "Préparez sereinement votre avenir avec un plan de retraite sur mesure et optimisé fiscalement.",
  },
  {
    icon: Home,
    title: "Assurance Hypothécaire",
    description: "Protégez votre propriété et votre famille contre les imprévus avec une couverture adaptée.",
  },
  {
    icon: GraduationCap,
    title: "REEE & Éducation",
    description: "Investissez dans l'avenir de vos enfants avec des régimes d'épargne-études avantageux.",
  },
  {
    icon: Briefcase,
    title: "Solutions Entreprises",
    description: "Accompagnement complet pour les entrepreneurs : assurance collective, succession, fiscalité.",
  },
];

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <span className="text-gold text-sm tracking-[0.3em] uppercase mb-4 block">
            Nos Expertises
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            Des Solutions Financières <span className="text-gradient">Sur Mesure</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Une approche personnalisée pour chaque aspect de votre vie financière, 
            avec l'excellence et la confidentialité au cœur de notre service.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="glass-card rounded-lg p-8 h-full border border-border hover:border-gold/30 transition-all duration-500 hover:shadow-glow">
                {/* Icon */}
                <div className="w-14 h-14 rounded-lg bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-gold" />
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Link */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-gold text-sm tracking-wide group/link"
                >
                  <span className="link-underline">En savoir plus</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
