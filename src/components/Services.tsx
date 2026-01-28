import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Briefcase, 
  PiggyBank, 
  Shield, 
  TrendingUp, 
  Home, 
  GraduationCap,
  ArrowUpRight
} from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Assurance Vie",
    description: "Protection financière complète pour vous et vos proches, adaptée à chaque étape de votre vie.",
  },
  {
    icon: PiggyBank,
    title: "Épargne & Placements",
    description: "Stratégies d'investissement personnalisées pour faire fructifier votre patrimoine.",
  },
  {
    icon: TrendingUp,
    title: "Planification Retraite",
    description: "Préparez sereinement votre avenir avec un plan de retraite optimisé fiscalement.",
  },
  {
    icon: Home,
    title: "Assurance Hypothécaire",
    description: "Protégez votre propriété et votre famille contre les imprévus.",
  },
  {
    icon: GraduationCap,
    title: "REEE & Éducation",
    description: "Investissez dans l'avenir de vos enfants avec des régimes d'épargne-études avantageux.",
  },
  {
    icon: Briefcase,
    title: "Solutions Entreprises",
    description: "Accompagnement complet pour entrepreneurs : assurance collective, succession, fiscalité.",
  },
];

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-20 lg:py-32 bg-gray-50 relative">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-gold-500 text-sm font-medium tracking-wider uppercase mb-4">
            Nos expertises
          </span>
          <h2 className="text-foreground mb-6">
            Des solutions financières <span className="text-gradient-gold">sur mesure</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Une approche personnalisée pour chaque aspect de votre vie financière, 
            avec l'excellence et la confidentialité au cœur de notre service.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <a
                href="#contact"
                className="group block h-full p-8 bg-background rounded-2xl border border-border hover:border-gold-300 hover:shadow-xl transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center mb-6 group-hover:bg-gold-200 transition-colors">
                  <service.icon className="w-6 h-6 text-gold-600" />
                </div>

                {/* Content */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-gold-600 transition-colors">
                    {service.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-gold-500 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
