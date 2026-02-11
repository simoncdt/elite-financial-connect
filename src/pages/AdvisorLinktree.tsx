import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTeamMemberBySlug } from "@/hooks/use-team-members";
import { AppointmentModal } from "@/components/AppointmentModal";
import {
  Mail, Phone, Linkedin, Facebook, Globe, Calendar, ArrowLeft,
  MapPin, Award, MessageCircle, Loader2,
} from "lucide-react";

const AdvisorLinktree = () => {
  const { advisorId } = useParams<{ advisorId: string }>();
  const { data: advisor, isLoading } = useTeamMemberBySlug(advisorId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950">
        <Loader2 className="w-8 h-8 animate-spin text-gold-400" />
      </div>
    );
  }

  if (!advisor) {
    return <Navigate to="/equipe" replace />;
  }

  const initials = advisor.name.split(" ").map((n) => n[0]).join("");

  const links = [
    { icon: Calendar, label: "Prendre rendez-vous", description: "Réservez une consultation gratuite", action: () => setIsModalOpen(true), primary: true },
    { icon: Mail, label: "Envoyer un courriel", description: advisor.email, href: `mailto:${advisor.email}` },
    ...(advisor.phone ? [{ icon: Phone, label: "Appeler", description: advisor.phone, href: `tel:${advisor.phone}` }] : []),
    ...(advisor.linkedin ? [{ icon: Linkedin, label: "LinkedIn", description: "Voir mon profil professionnel", href: advisor.linkedin, external: true }] : []),
    ...(advisor.facebook ? [{ icon: Facebook, label: "Facebook", description: "Suivez-moi sur Facebook", href: advisor.facebook, external: true }] : []),
    { icon: Globe, label: "Visiter notre site web", description: "lessimplificateursfinanciers.ca", href: "/" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-20 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="p-4">
          <Link to="/equipe" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour à l'équipe
          </Link>
        </div>

        <div className="flex-1 flex flex-col items-center px-4 py-8 max-w-md mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-8">
            <div className="relative inline-block mb-6">
              {advisor.photo_url ? (
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-gold-500/30 ring-offset-4 ring-offset-navy-950">
                  <img src={advisor.photo_url} alt={advisor.name} className="w-full h-full object-cover object-top" />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center ring-4 ring-gold-500/30 ring-offset-4 ring-offset-navy-950">
                  <span className="text-4xl font-semibold text-white">{initials}</span>
                </div>
              )}
              <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-3 border-navy-950" />
            </div>
            <h1 className="text-2xl font-semibold text-white mb-1">{advisor.name}</h1>
            <p className="text-gold-400 font-medium mb-2">{advisor.role}</p>
            <div className="flex items-center justify-center gap-1.5 text-gray-400 text-sm mb-4">
              <MapPin className="w-4 h-4" /> Montréal, Québec
            </div>
            {advisor.is_leader && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold-500/20 rounded-full">
                <Award className="w-4 h-4 text-gold-400" />
                <span className="text-gold-400 text-xs font-medium">Conseiller Senior</span>
              </div>
            )}
            {advisor.description && (
              <p className="text-gray-300 text-sm leading-relaxed mt-4 max-w-xs mx-auto">{advisor.description}</p>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="w-full space-y-3">
            {links.map((link, index) => {
              const content = (
                <div className={`w-full p-4 rounded-2xl border transition-all duration-300 group
                  ${link.primary ? "bg-gold-500 border-gold-500 hover:bg-gold-600 hover:border-gold-600" : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${link.primary ? "bg-white/20" : "bg-white/5 group-hover:bg-white/10"}`}>
                      <link.icon className={`w-5 h-5 ${link.primary ? "text-white" : "text-gold-400"}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-white">{link.label}</p>
                      <p className={`text-sm ${link.primary ? "text-white/80" : "text-gray-400"}`}>{link.description}</p>
                    </div>
                  </div>
                </div>
              );

              if (link.action) {
                return (
                  <motion.button key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }} onClick={link.action} className="w-full">
                    {content}
                  </motion.button>
                );
              }
              if (link.href?.startsWith("/")) {
                return (
                  <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}>
                    <Link to={link.href} className="block">{content}</Link>
                  </motion.div>
                );
              }
              return (
                <motion.a key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  href={link.href} target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined} className="block">
                  {content}
                </motion.a>
              );
            })}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="mt-12 text-center">
            <p className="text-gray-500 text-xs mb-2">Membre de l'équipe</p>
            <Link to="/" className="text-gold-400 hover:text-gold-300 font-medium text-sm transition-colors">Les Simplificateurs Financiers</Link>
          </motion.div>
        </div>
      </div>

      <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} preselectedAdvisor={advisorId} />
    </div>
  );
};

export default AdvisorLinktree;
