import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Linkedin, Facebook, Instagram } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-800 border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                <span className="text-navy-900 font-serif font-bold text-lg">SF</span>
              </div>
              <div>
                <span className="text-foreground font-serif text-lg tracking-wide block">
                  Les Simplificateurs
                </span>
                <span className="text-gold text-xs tracking-[0.3em] uppercase">
                  Financiers
                </span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Votre partenaire de confiance pour une gestion financière simplifiée et performante au Canada.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Instagram, href: "#", label: "Instagram" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center text-muted-foreground hover:bg-gold hover:text-navy-900 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-foreground mb-6">Navigation</h4>
            <ul className="space-y-3">
              {[
                { name: "Accueil", href: "#hero" },
                { name: "Nos Services", href: "#services" },
                { name: "Notre Équipe", href: "#team" },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-gold text-sm transition-colors link-underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-foreground mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                "Assurance Vie",
                "Épargne & Placements",
                "Planification Retraite",
                "Assurance Hypothécaire",
                "REEE & Éducation",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-muted-foreground hover:text-gold text-sm transition-colors link-underline"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-foreground mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  Montréal, Québec<br />Canada
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <a
                  href="tel:+15145551234"
                  className="text-muted-foreground hover:text-gold text-sm transition-colors"
                >
                  (514) 555-1234
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <a
                  href="mailto:info@simplificateursfinanciers.ca"
                  className="text-muted-foreground hover:text-gold text-sm transition-colors"
                >
                  info@simplificateursfinanciers.ca
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-xs">
              © {currentYear} Les Simplificateurs Financiers. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-gold text-xs transition-colors"
              >
                Politique de confidentialité
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-gold text-xs transition-colors"
              >
                Conditions d'utilisation
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-gold text-xs transition-colors"
              >
                Loi 25
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
