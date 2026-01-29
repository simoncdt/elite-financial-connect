import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, ArrowRight, Mail, CheckCircle } from "lucide-react";

export const EngagementPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if popup was already shown
    const hasSeenPopup = sessionStorage.getItem("engagement-popup-seen");
    if (hasSeenPopup) return;

    // Show popup after 45 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem("engagement-popup-seen", "true");
    }, 45000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Close after success
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
                       md:max-w-md md:w-full
                       bg-background rounded-3xl shadow-2xl z-50 border border-border overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center
                       text-muted-foreground hover:text-foreground hover:bg-white transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Decorative gradient */}
            <div className="h-32 bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 relative overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-4 left-8 w-20 h-20 border-2 border-white/30 rounded-full" />
                <div className="absolute bottom-2 right-12 w-14 h-14 border-2 border-white/20 rounded-full" />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2
                            w-20 h-20 bg-background rounded-2xl shadow-xl flex items-center justify-center">
                <Gift className="w-10 h-10 text-gold-500" />
              </div>
            </div>

            <div className="p-6 pt-14 text-center">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Merci!
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Vous recevrez bientôt nos conseils financiers exclusifs.
                  </p>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-2xl font-semibold text-foreground mb-2">
                    Conseils financiers gratuits
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    Inscrivez-vous à notre infolettre et recevez notre guide exclusif : 
                    <strong className="text-foreground"> "5 stratégies pour optimiser vos finances"</strong>
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Votre courriel"
                        className="w-full pl-12 pr-4 py-3.5 bg-secondary border border-transparent rounded-xl
                                 text-foreground placeholder:text-muted-foreground
                                 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent
                                 transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-gold-500 text-white rounded-xl font-medium
                               hover:bg-gold-600 transition-all transform hover:scale-[1.02] active:scale-[0.98]
                               disabled:opacity-50 disabled:cursor-not-allowed
                               flex items-center justify-center gap-2 shadow-lg shadow-gold-500/25"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Inscription...
                        </span>
                      ) : (
                        <>
                          Recevoir mon guide gratuit
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-xs text-muted-foreground mt-4">
                    En vous inscrivant, vous acceptez de recevoir nos communications.
                    Désabonnement possible à tout moment.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
