import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, ArrowUpRight, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { teamMembers, getLeaders, getAdvisors, TeamMember } from "@/lib/team-data";
import { AppointmentModal } from "./AppointmentModal";

const LeaderCard = ({ 
  member, 
  index, 
  onBookAppointment 
}: { 
  member: TeamMember; 
  index: number;
  onBookAppointment: (id: string) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-3xl bg-background border border-border hover:border-gold-300 hover:shadow-xl transition-all duration-300">
        {/* Photo */}
        <div className="relative aspect-[4/5] overflow-hidden">
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-6xl font-light text-gray-400">
                {member.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
          <p className="text-gold-500 text-sm font-medium mb-4">{member.role}</p>
          
          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onBookAppointment(member.id)}
              className="flex-1 py-2.5 bg-gold-500 text-white rounded-xl text-sm font-medium
                       hover:bg-gold-600 transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Prendre RDV
            </button>
            <a
              href={`mailto:${member.email}`}
              className="w-10 h-10 rounded-xl bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background hover:border-gold-300 transition-all"
              aria-label={`Email ${member.name}`}
            >
              <Mail className="w-4 h-4" />
            </a>
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background hover:border-gold-300 transition-all"
                aria-label={`LinkedIn ${member.name}`}
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AdvisorCard = ({ 
  member, 
  index,
  onBookAppointment 
}: { 
  member: TeamMember; 
  index: number;
  onBookAppointment: (id: string) => void;
}) => {
  const initials = member.name.split(" ").map((n) => n[0]).join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <div className="group block p-5 bg-background rounded-2xl border border-border hover:border-gold-300 hover:shadow-lg transition-all duration-300">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-4 group-hover:from-gold-100 group-hover:to-gold-50 transition-all">
          <span className="text-lg font-medium text-gray-400 group-hover:text-gold-600 transition-colors">
            {initials}
          </span>
        </div>

        {/* Info */}
        <h4 className="font-medium text-foreground text-sm mb-0.5 group-hover:text-gold-600 transition-colors">
          {member.name}
        </h4>
        <p className="text-muted-foreground text-xs mb-4">{member.role}</p>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onBookAppointment(member.id)}
            className="flex-1 py-2 bg-secondary text-foreground rounded-xl text-xs font-medium
                     hover:bg-gold-500 hover:text-white transition-all flex items-center justify-center gap-1"
          >
            <Calendar className="w-3.5 h-3.5" />
            RDV
          </button>
          <a
            href={`mailto:${member.email}`}
            className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-gray-200 transition-all"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdvisor, setSelectedAdvisor] = useState("");

  const leaders = getLeaders();
  const advisors = getAdvisors();

  const handleBookAppointment = (advisorId: string) => {
    setSelectedAdvisor(advisorId);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="team" className="py-20 lg:py-32 bg-background relative">
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

          {/* Leaders Grid */}
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

          {/* View All Team CTA */}
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

          {/* Divider */}
          <div className="divider mb-16" />

          {/* Advisors Label */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-muted-foreground text-sm mb-8"
          >
            Notre équipe de conseillers
          </motion.p>

          {/* Advisors Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {advisors.map((member, index) => (
              <AdvisorCard 
                key={member.id} 
                member={member} 
                index={index}
                onBookAppointment={handleBookAppointment}
              />
            ))}
          </div>
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
