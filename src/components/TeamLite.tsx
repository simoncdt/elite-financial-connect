import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { LeaderCard } from "./Team";
import { useTeamMembers } from "@/hooks/use-team-members";
import { AppointmentModal } from "./AppointmentModal";

export const TeamLite = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdvisor, setSelectedAdvisor] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: members } = useTeamMembers();

  const leaders = members?.filter((m) => m.is_leader) || [];

  const handleBookAppointment = (slug: string) => {
    setSelectedAdvisor(slug);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="team-leaders" className="py-20 lg:py-32 bg-background relative">
        <div className="section-container">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block text-gold-500 text-sm font-medium tracking-wider uppercase mb-4">
              Notre équipe
            </span>
            <h2 className="text-foreground mb-6">
              Les <span className="text-gradient-gold">Simplificateurs</span> à votre service
            </h2>
            <p className="text-muted-foreground text-lg">
              Une équipe de professionnels passionnés, dédiés à simplifier votre vie financière
              et à vous accompagner vers l'atteinte de vos objectifs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {leaders.map((member, index) => (
              <LeaderCard
                key={member.id}
                member={member}
                index={index}
                onBookAppointment={handleBookAppointment}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Link
              to="/equipe"
              className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-600 font-medium transition-colors"
            >
              Voir toute l'équipe
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preselectedAdvisor={selectedAdvisor}
      />
    </>
  );
};
