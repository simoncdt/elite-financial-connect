import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTeamMembers, TeamMemberDB } from "@/hooks/use-team-members";
import { AppointmentModal } from "./AppointmentModal";

/* =======================
   LEADER CARD
======================= */
export const LeaderCard = ({
  member,
  index,
  onBookAppointment,
}: {
  member: TeamMemberDB;
  index: number;
  onBookAppointment: (slug: string) => void;
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
        <div className="relative aspect-[4/5] overflow-hidden">
          {member.photo_url ? (
            <img src={member.photo_url} alt={member.name} loading="lazy" decoding="async"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-6xl font-light text-gray-400">
                {member.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
          <p className="text-gold-500 text-sm font-medium mb-4">{member.role}</p>
          <div className="flex items-center gap-2">
            <button onClick={() => onBookAppointment(member.slug)}
              className="flex-1 py-2.5 bg-gold-500 text-white rounded-xl text-sm font-medium hover:bg-gold-600 transition-all flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" /> Prendre RDV
            </button>
            <a href={`mailto:${member.email}`}
              className="w-10 h-10 rounded-xl bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-gold-300 transition-all">
              <Mail className="w-4 h-4" />
            </a>
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-gold-300 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* =======================
   ADVISOR CARD
======================= */
const AdvisorCard = ({
  member, index, onBookAppointment,
}: {
  member: TeamMemberDB; index: number; onBookAppointment: (slug: string) => void;
}) => {
  const initials = member.name.split(" ").map((n) => n[0]).join("");
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}>
      <div className="group p-5 bg-background rounded-2xl border border-border hover:border-gold-300 hover:shadow-lg transition-all duration-300">
        <div className="w-14 h-14 rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-gold-100 group-hover:to-gold-50 transition-all">
          {member.photo_url ? (
            <img src={member.photo_url} alt={member.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
          ) : (
            <span className="text-lg font-medium text-gray-400 group-hover:text-gold-600 transition-colors">{initials}</span>
          )}
        </div>
        <h4 className="font-medium text-foreground text-sm mb-0.5 group-hover:text-gold-600 transition-colors">{member.name}</h4>
        <p className="text-muted-foreground text-xs mb-4">{member.role}</p>
        <div className="flex gap-2">
          <button onClick={() => onBookAppointment(member.slug)}
            className="flex-1 py-2 bg-secondary text-foreground rounded-xl text-xs font-medium hover:bg-gold-500 hover:text-white transition-all flex items-center justify-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> RDV
          </button>
          <a href={`mailto:${member.email}`}
            className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

/* =======================
   TEAM SECTION
======================= */
export const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedAdvisor, setSelectedAdvisor] = useState<string | null>(null);
  const { data: members } = useTeamMembers();

  const leaders = members?.filter((m) => m.is_leader) || [];
  const advisors = members?.filter((m) => !m.is_leader) || [];

  return (
    <>
      <section id="team" className="py-20 lg:py-32 bg-background">
        <div className="section-container">
          <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold-500 text-sm font-medium uppercase mb-4 block">Notre équipe</span>
            <h2 className="mb-6">Les <span className="text-gradient-gold">Simplificateurs</span> à votre service</h2>
            <p className="text-muted-foreground text-lg">Une équipe de professionnels passionnés, dédiés à simplifier votre vie financière.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {leaders.map((m, i) => (
              <LeaderCard key={m.id} member={m} index={i} onBookAppointment={setSelectedAdvisor} />
            ))}
          </div>
          <motion.div className="text-center mb-16">
            <Link to="/equipe" className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-600 font-medium">
              Voir toute l'équipe <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="divider mb-16" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {advisors.map((m, i) => (
              <AdvisorCard key={m.id} member={m} index={i} onBookAppointment={setSelectedAdvisor} />
            ))}
          </div>
        </div>
      </section>
      <AppointmentModal isOpen={!!selectedAdvisor} onClose={() => setSelectedAdvisor(null)} preselectedAdvisor={selectedAdvisor ?? ""} />
    </>
  );
};
