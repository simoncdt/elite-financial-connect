import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, ArrowUpRight } from "lucide-react";

// Import team photos
import abdelbariPhoto from "@/assets/team/abdelbari-nasri.jpg";
import helaPhoto from "@/assets/team/hela-taghouti.jpg";
import ameliePhoto from "@/assets/team/amelie-bolduc.jpg";

interface TeamMember {
  name: string;
  role: string;
  email: string;
  photo: string | null;
  isLeader?: boolean;
}

const teamMembers: TeamMember[] = [
  {
    name: "Abdelbari Nasri",
    role: "Conseiller Senior",
    email: "abdelbari.nasri@agc.ia.ca",
    photo: abdelbariPhoto,
    isLeader: true,
  },
  {
    name: "Hela Taghouti",
    role: "Conseillère Senior",
    email: "hela.taghouti@agc.ia.ca",
    photo: helaPhoto,
    isLeader: true,
  },
  {
    name: "Amélie Bolduc",
    role: "Conseillère Senior",
    email: "amelie.bolduc@agc.ia.ca",
    photo: ameliePhoto,
    isLeader: true,
  },
  {
    name: "Sofiane Lemanaa",
    role: "Conseiller Financier",
    email: "sofiane.lemanaa@agc.ia.ca",
    photo: null,
  },
  {
    name: "Maryam Benlimam",
    role: "Conseillère Financière",
    email: "maryam.benlimam@agc.ia.ca",
    photo: null,
  },
  {
    name: "Dalel Djeffel",
    role: "Conseillère Financière",
    email: "dalel.djeffel@agc.ia.ca",
    photo: null,
  },
  {
    name: "Jonathan Lemay",
    role: "Conseiller Financier",
    email: "jonathan.lemay@agc.ia.ca",
    photo: null,
  },
  {
    name: "Valérie Boisvert",
    role: "Conseillère Financière",
    email: "valerie.boisvert@agc.ia.ca",
    photo: null,
  },
  {
    name: "Mamadou Seck",
    role: "Conseiller Financier",
    email: "mamadou.seck@agc.ia.ca",
    photo: null,
  },
  {
    name: "Thouraya Saghrouni",
    role: "Conseillère Financière",
    email: "thouraya.saghouni@agc.ia.ca",
    photo: null,
  },
];

const LeaderCard = ({ member, index }: { member: TeamMember; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-3xl bg-background border border-border">
        {/* Photo */}
        <div className="relative aspect-[4/5] overflow-hidden">
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-6xl font-light text-gray-300">
                {member.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
          <p className="text-gold-500 text-sm font-medium mb-4">{member.role}</p>
          
          {/* Social Links */}
          <div className="flex gap-2">
            <a
              href={`mailto:${member.email}`}
              className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background hover:border-gold-300 transition-all"
              aria-label={`Email ${member.name}`}
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background hover:border-gold-300 transition-all"
              aria-label={`LinkedIn ${member.name}`}
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AdvisorCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const initials = member.name.split(" ").map((n) => n[0]).join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <a
        href={`mailto:${member.email}`}
        className="group block p-5 bg-background rounded-2xl border border-border hover:border-gold-300 hover:shadow-lg transition-all duration-300"
      >
        {/* Avatar */}
        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-gold-100 transition-colors">
          <span className="text-lg font-medium text-gray-400 group-hover:text-gold-600 transition-colors">
            {initials}
          </span>
        </div>

        {/* Info */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-medium text-foreground text-sm mb-0.5 group-hover:text-gold-600 transition-colors">
              {member.name}
            </h4>
            <p className="text-muted-foreground text-xs">{member.role}</p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-gold-500 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0 mt-1" />
        </div>
      </a>
    </motion.div>
  );
};

export const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const leaders = teamMembers.filter((m) => m.isLeader);
  const advisors = teamMembers.filter((m) => !m.isLeader);

  return (
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {leaders.map((member, index) => (
            <LeaderCard key={member.email} member={member} index={index} />
          ))}
        </div>

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
            <AdvisorCard key={member.email} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
