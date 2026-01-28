import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Quote } from "lucide-react";

const benefits = [
  "Plus de 15 ans d'expérience",
  "Conseillers certifiés AMF",
  "Approche personnalisée",
  "Confidentialité garantie",
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 lg:py-32 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gold-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-gold-500 text-sm font-medium tracking-wider uppercase mb-4">
              À propos
            </span>
            <h2 className="text-foreground mb-6">
              Une mission : <span className="text-gradient-gold">simplifier</span> vos finances
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Les Simplificateurs Financiers sont nés d'une conviction : la gestion financière 
              ne devrait pas être source de stress. Notre équipe combine expertise, technologie 
              et approche humaine pour vous offrir des solutions claires et adaptées à votre réalité.
            </p>

            {/* Benefits list */}
            <ul className="space-y-4 mb-10">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-gold-600" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </motion.li>
              ))}
            </ul>

            <a href="#contact" className="btn-primary gap-2">
              Planifier une consultation
            </a>
          </motion.div>

          {/* Right Column - Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative p-8 lg:p-10 bg-background rounded-3xl border border-border shadow-xl">
              {/* Quote icon */}
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-gold-500 flex items-center justify-center shadow-lg">
                <Quote className="w-6 h-6 text-accent-foreground" />
              </div>

              <blockquote className="text-xl lg:text-2xl text-foreground font-medium leading-relaxed mb-8">
                "Grâce aux Simplificateurs, j'ai enfin une vision claire de mes finances. 
                Leur approche personnalisée et leur disponibilité font toute la différence."
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-500">MC</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Marie-Claire D.</p>
                  <p className="text-sm text-muted-foreground">Cliente depuis 2019</p>
                </div>
              </div>

              {/* Decorative element */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gold-100/50 rounded-tl-[100px] -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
