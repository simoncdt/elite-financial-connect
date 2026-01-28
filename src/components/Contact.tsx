import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, CheckCircle, User, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const advisors = [
  { value: "random", label: "Aucun conseiller précis (attribution automatique)" },
  { value: "abdelbari.nasri@agc.ia.ca", label: "Abdelbari Nasri" },
  { value: "hela.taghouti@agc.ia.ca", label: "Hela Taghouti" },
  { value: "amelie.bolduc@agc.ia.ca", label: "Amélie Bolduc" },
  { value: "sofiane.lemanaa@agc.ia.ca", label: "Sofiane Lemanaa" },
  { value: "maryam.benlimam@agc.ia.ca", label: "Maryam Benlimam" },
  { value: "dalel.djeffel@agc.ia.ca", label: "Dalel Djeffel" },
  { value: "jonathan.lemay@agc.ia.ca", label: "Jonathan Lemay" },
  { value: "valerie.boisvert@agc.ia.ca", label: "Valérie Boisvert" },
  { value: "mamadou.seck@agc.ia.ca", label: "Mamadou Seck" },
  { value: "thouraya.saghouni@agc.ia.ca", label: "Thouraya Saghrouni" },
];

const services = [
  { value: "assurance-vie", label: "Assurance Vie" },
  { value: "epargne-placements", label: "Épargne & Placements" },
  { value: "planification-retraite", label: "Planification Retraite" },
  { value: "assurance-hypothecaire", label: "Assurance Hypothécaire" },
  { value: "reee", label: "REEE & Éducation" },
  { value: "solutions-entreprises", label: "Solutions Entreprises" },
  { value: "autre", label: "Autre" },
];

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    advisor: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    toast({
      title: "Demande envoyée avec succès!",
      description: "Un conseiller vous contactera dans les plus brefs délais.",
    });

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        advisor: "",
        service: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      {/* Floating orb */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl -translate-x-1/2"
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Info */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold text-sm tracking-[0.3em] uppercase mb-4 block">
              Contact
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              Prenez <span className="text-gradient">Rendez-vous</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Faites le premier pas vers une gestion financière simplifiée. 
              Nos conseillers sont à votre écoute pour répondre à toutes vos questions.
            </p>

            {/* Benefits */}
            <div className="space-y-6">
              {[
                {
                  icon: User,
                  title: "Consultation Personnalisée",
                  description: "Une analyse approfondie de votre situation unique",
                },
                {
                  icon: Calendar,
                  title: "Flexibilité Totale",
                  description: "Rencontres en personne, par téléphone ou vidéoconférence",
                },
                {
                  icon: CheckCircle,
                  title: "Sans Engagement",
                  description: "Première consultation gratuite et sans obligation",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-serif text-foreground mb-1">{benefit.title}</h4>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-card rounded-xl p-8 lg:p-10 border border-border">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold/20 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-gold" />
                  </div>
                  <h3 className="font-serif text-2xl text-foreground mb-3">Merci!</h3>
                  <p className="text-muted-foreground">
                    Votre demande a été envoyée avec succès. Un conseiller vous contactera sous peu.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Prénom *</label>
                      <Input
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="bg-navy-800 border-border focus:border-gold text-foreground"
                        placeholder="Jean"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Nom *</label>
                      <Input
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="bg-navy-800 border-border focus:border-gold text-foreground"
                        placeholder="Dupont"
                      />
                    </div>
                  </div>

                  {/* Contact Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Courriel *</label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-navy-800 border-border focus:border-gold text-foreground"
                        placeholder="jean.dupont@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Téléphone</label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-navy-800 border-border focus:border-gold text-foreground"
                        placeholder="(514) 555-0123"
                      />
                    </div>
                  </div>

                  {/* Advisor Selection */}
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Choisir un conseiller
                    </label>
                    <Select
                      value={formData.advisor}
                      onValueChange={(value) => setFormData({ ...formData, advisor: value })}
                    >
                      <SelectTrigger className="bg-navy-800 border-border focus:border-gold text-foreground">
                        <SelectValue placeholder="Sélectionner un conseiller" />
                      </SelectTrigger>
                      <SelectContent className="bg-navy-800 border-border">
                        {advisors.map((advisor) => (
                          <SelectItem
                            key={advisor.value}
                            value={advisor.value}
                            className="text-foreground hover:bg-navy-700 focus:bg-navy-700"
                          >
                            {advisor.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Service souhaité
                    </label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => setFormData({ ...formData, service: value })}
                    >
                      <SelectTrigger className="bg-navy-800 border-border focus:border-gold text-foreground">
                        <SelectValue placeholder="Sélectionner un service" />
                      </SelectTrigger>
                      <SelectContent className="bg-navy-800 border-border">
                        {services.map((service) => (
                          <SelectItem
                            key={service.value}
                            value={service.value}
                            className="text-foreground hover:bg-navy-700 focus:bg-navy-700"
                          >
                            {service.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Message</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-navy-800 border-border focus:border-gold text-foreground min-h-[120px] resize-none"
                      placeholder="Décrivez brièvement votre situation ou vos besoins..."
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-luxury rounded-sm text-base tracking-widest uppercase py-6 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-navy-900 border-t-transparent rounded-full"
                        />
                        Envoi en cours...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Envoyer ma demande
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    En soumettant ce formulaire, vous acceptez notre politique de confidentialité.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
