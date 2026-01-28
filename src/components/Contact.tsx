import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, CheckCircle, ArrowRight, Phone, Mail, MapPin } from "lucide-react";
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
    <section id="contact" className="py-20 lg:py-32 bg-background relative">
      <div className="section-container">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Column - Info (2 cols) */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <span className="inline-block text-gold-500 text-sm font-medium tracking-wider uppercase mb-4">
              Contact
            </span>
            <h2 className="text-foreground mb-6">
              Prenons <span className="text-gradient-gold">rendez-vous</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Faites le premier pas vers une gestion financière simplifiée. 
              Notre équipe est à votre écoute.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gold-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Téléphone</p>
                  <a href="tel:+15145551234" className="text-muted-foreground hover:text-gold-500 transition-colors">
                    (514) 555-1234
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gold-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Courriel</p>
                  <a href="mailto:info@simplificateursfinanciers.ca" className="text-muted-foreground hover:text-gold-500 transition-colors">
                    info@simplificateursfinanciers.ca
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gold-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Adresse</p>
                  <p className="text-muted-foreground">
                    Montréal, Québec<br />Canada
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form (3 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="p-6 sm:p-8 lg:p-10 bg-gray-50 rounded-3xl">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold-100 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-gold-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">Merci!</h3>
                  <p className="text-muted-foreground">
                    Votre demande a été envoyée. Un conseiller vous contactera sous peu.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Prénom *</label>
                      <Input
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="bg-background border-border focus:border-gold-400 focus:ring-gold-400 h-12 rounded-xl"
                        placeholder="Jean"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Nom *</label>
                      <Input
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="bg-background border-border focus:border-gold-400 focus:ring-gold-400 h-12 rounded-xl"
                        placeholder="Dupont"
                      />
                    </div>
                  </div>

                  {/* Contact Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Courriel *</label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-background border-border focus:border-gold-400 focus:ring-gold-400 h-12 rounded-xl"
                        placeholder="jean.dupont@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Téléphone</label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-background border-border focus:border-gold-400 focus:ring-gold-400 h-12 rounded-xl"
                        placeholder="(514) 555-0123"
                      />
                    </div>
                  </div>

                  {/* Advisor Selection */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Choisir un conseiller
                    </label>
                    <Select
                      value={formData.advisor}
                      onValueChange={(value) => setFormData({ ...formData, advisor: value })}
                    >
                      <SelectTrigger className="bg-background border-border focus:border-gold-400 focus:ring-gold-400 h-12 rounded-xl">
                        <SelectValue placeholder="Sélectionner un conseiller" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border rounded-xl">
                        {advisors.map((advisor) => (
                          <SelectItem
                            key={advisor.value}
                            value={advisor.value}
                            className="focus:bg-gold-50 focus:text-foreground rounded-lg"
                          >
                            {advisor.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Service souhaité
                    </label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => setFormData({ ...formData, service: value })}
                    >
                      <SelectTrigger className="bg-background border-border focus:border-gold-400 focus:ring-gold-400 h-12 rounded-xl">
                        <SelectValue placeholder="Sélectionner un service" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border rounded-xl">
                        {services.map((service) => (
                          <SelectItem
                            key={service.value}
                            value={service.value}
                            className="focus:bg-gold-50 focus:text-foreground rounded-lg"
                          >
                            {service.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-background border-border focus:border-gold-400 focus:ring-gold-400 min-h-[120px] resize-none rounded-xl"
                      placeholder="Décrivez brièvement votre situation ou vos besoins..."
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary h-14 text-base rounded-xl disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
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
