import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, Mail, Phone, MessageSquare, CheckCircle } from "lucide-react";
import { teamMembers, TeamMember, getNextAdvisorForRotation } from "@/lib/team-data";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedAdvisor?: string;
}

const services = [
  "Planification financière",
  "Assurance vie",
  "Assurance invalidité",
  "Épargne et investissement",
  "Planification de la retraite",
  "Protection du patrimoine",
  "Autre",
];

export const AppointmentModal = ({ isOpen, onClose, preselectedAdvisor }: AppointmentModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    advisor: preselectedAdvisor || "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [assignedAdvisor, setAssignedAdvisor] = useState<TeamMember | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Determine advisor (rotation if none selected)
    let selectedAdvisor: TeamMember | undefined;
    if (formData.advisor === "" || formData.advisor === "rotation") {
      selectedAdvisor = getNextAdvisorForRotation();
    } else {
      selectedAdvisor = teamMembers.find(m => m.id === formData.advisor);
    }

    setAssignedAdvisor(selectedAdvisor || null);

    // Simulate submission (replace with actual API call when Lovable Cloud is enabled)
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        advisor: preselectedAdvisor || "",
        message: "",
      });
      onClose();
    }, 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
                       md:max-w-lg md:w-full max-h-[90vh] overflow-y-auto
                       bg-background rounded-3xl shadow-2xl z-50 border border-border"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary flex items-center justify-center
                       text-muted-foreground hover:text-foreground hover:bg-gray-200 transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 md:p-12 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  Demande envoyée!
                </h3>
                <p className="text-muted-foreground mb-4">
                  Merci pour votre confiance. 
                  {assignedAdvisor && (
                    <span className="block mt-2">
                      <strong className="text-foreground">{assignedAdvisor.name}</strong> vous contactera sous peu.
                    </span>
                  )}
                </p>
                <p className="text-sm text-muted-foreground">
                  Un courriel de confirmation a été envoyé à {formData.email}
                </p>
              </motion.div>
            ) : (
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-gold-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-foreground">
                      Prendre rendez-vous
                    </h2>
                  </div>
                  <p className="text-muted-foreground">
                    Remplissez ce formulaire et un conseiller vous contactera rapidement.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nom complet *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Votre nom"
                        className="w-full pl-12 pr-4 py-3 bg-secondary border border-transparent rounded-xl
                                 text-foreground placeholder:text-muted-foreground
                                 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent
                                 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Courriel *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="votre@courriel.com"
                        className="w-full pl-12 pr-4 py-3 bg-secondary border border-transparent rounded-xl
                                 text-foreground placeholder:text-muted-foreground
                                 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent
                                 transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Téléphone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(514) 123-4567"
                        className="w-full pl-12 pr-4 py-3 bg-secondary border border-transparent rounded-xl
                                 text-foreground placeholder:text-muted-foreground
                                 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent
                                 transition-all"
                      />
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Service souhaité *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-secondary border border-transparent rounded-xl
                               text-foreground appearance-none cursor-pointer
                               focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent
                               transition-all"
                    >
                      <option value="">Sélectionnez un service</option>
                      {services.map(service => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  {/* Advisor Selection */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Conseiller préféré
                    </label>
                    <select
                      name="advisor"
                      value={formData.advisor}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-secondary border border-transparent rounded-xl
                               text-foreground appearance-none cursor-pointer
                               focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent
                               transition-all"
                    >
                      <option value="rotation">Aucune préférence (attribution automatique)</option>
                      {teamMembers.map(member => (
                        <option key={member.id} value={member.id}>{member.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message (optionnel)
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Décrivez brièvement votre situation..."
                        className="w-full pl-12 pr-4 py-3 bg-secondary border border-transparent rounded-xl
                                 text-foreground placeholder:text-muted-foreground resize-none
                                 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent
                                 transition-all"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gold-500 text-white rounded-xl font-medium
                             hover:bg-gold-600 transition-all transform hover:scale-[1.02] active:scale-[0.98]
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                             shadow-lg shadow-gold-500/25"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Envoi en cours...
                      </span>
                    ) : (
                      "Envoyer ma demande"
                    )}
                  </button>

                  <p className="text-xs text-center text-muted-foreground">
                    En soumettant ce formulaire, vous acceptez notre{" "}
                    <a href="#" className="text-gold-500 hover:underline">politique de confidentialité</a>.
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
