import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Settings, Check } from "lucide-react";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if consent was already given
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(allAccepted);
  };

  const handleAcceptNecessary = () => {
    const necessaryOnly: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    saveConsent(necessaryOnly);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(prefs));
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    
    // If analytics accepted, enable GTM
    if (prefs.analytics && typeof window !== "undefined") {
      // GTM is already loaded, consent is now given
      (window as any).dataLayer?.push({
        event: "consent_update",
        analytics_consent: prefs.analytics,
        marketing_consent: prefs.marketing,
      });
    }
    
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-background border border-border rounded-2xl shadow-2xl overflow-hidden">
              {!showPreferences ? (
                /* Main Banner */
                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center flex-shrink-0">
                      <Cookie className="w-6 h-6 text-gold-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Votre vie privée nous importe
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        Nous utilisons des témoins (cookies) pour améliorer votre expérience, 
                        analyser le trafic et personnaliser le contenu. Conformément à la Loi 25 
                        du Québec, nous vous demandons votre consentement.
                      </p>
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          onClick={handleAcceptAll}
                          className="px-5 py-2.5 bg-gold-500 text-white rounded-xl font-medium text-sm
                                   hover:bg-gold-600 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                          Tout accepter
                        </button>
                        <button
                          onClick={handleAcceptNecessary}
                          className="px-5 py-2.5 bg-secondary text-foreground rounded-xl font-medium text-sm
                                   hover:bg-gray-200 transition-all"
                        >
                          Nécessaires uniquement
                        </button>
                        <button
                          onClick={() => setShowPreferences(true)}
                          className="px-5 py-2.5 text-muted-foreground hover:text-foreground 
                                   text-sm font-medium flex items-center gap-2 transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          Personnaliser
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsVisible(false)}
                      className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center
                               text-muted-foreground hover:text-foreground hover:bg-gray-200 transition-all flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Preferences Panel */
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-foreground">
                      Paramètres des témoins
                    </h3>
                    <button
                      onClick={() => setShowPreferences(false)}
                      className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center
                               text-muted-foreground hover:text-foreground hover:bg-gray-200 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    {/* Necessary */}
                    <div className="flex items-start justify-between p-4 bg-secondary/50 rounded-xl">
                      <div className="flex-1 pr-4">
                        <h4 className="font-medium text-foreground text-sm mb-1">
                          Témoins nécessaires
                        </h4>
                        <p className="text-muted-foreground text-xs">
                          Essentiels au fonctionnement du site. Ne peuvent être désactivés.
                        </p>
                      </div>
                      <div className="w-12 h-6 bg-gold-500 rounded-full flex items-center justify-end pr-1">
                        <div className="w-4 h-4 bg-white rounded-full" />
                      </div>
                    </div>

                    {/* Analytics */}
                    <div className="flex items-start justify-between p-4 bg-secondary/50 rounded-xl">
                      <div className="flex-1 pr-4">
                        <h4 className="font-medium text-foreground text-sm mb-1">
                          Témoins analytiques
                        </h4>
                        <p className="text-muted-foreground text-xs">
                          Nous aident à comprendre comment vous utilisez le site (Google Analytics).
                        </p>
                      </div>
                      <button
                        onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                        className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                          preferences.analytics ? "bg-gold-500 justify-end pr-1" : "bg-gray-300 justify-start pl-1"
                        }`}
                      >
                        <div className="w-4 h-4 bg-white rounded-full" />
                      </button>
                    </div>

                    {/* Marketing */}
                    <div className="flex items-start justify-between p-4 bg-secondary/50 rounded-xl">
                      <div className="flex-1 pr-4">
                        <h4 className="font-medium text-foreground text-sm mb-1">
                          Témoins marketing
                        </h4>
                        <p className="text-muted-foreground text-xs">
                          Utilisés pour afficher du contenu personnalisé et pertinent.
                        </p>
                      </div>
                      <button
                        onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                        className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                          preferences.marketing ? "bg-gold-500 justify-end pr-1" : "bg-gray-300 justify-start pl-1"
                        }`}
                      >
                        <div className="w-4 h-4 bg-white rounded-full" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleSavePreferences}
                      className="flex-1 py-3 bg-gold-500 text-white rounded-xl font-medium text-sm
                               hover:bg-gold-600 transition-all flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Sauvegarder mes choix
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="px-5 py-3 bg-secondary text-foreground rounded-xl font-medium text-sm
                               hover:bg-gray-200 transition-all"
                    >
                      Tout accepter
                    </button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Pour plus d'informations, consultez notre{" "}
                    <a href="#" className="text-gold-500 hover:underline">politique de confidentialité</a>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
