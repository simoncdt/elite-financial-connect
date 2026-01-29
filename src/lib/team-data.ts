// Import team photos
import abdelbariPhoto from "@/assets/team/abdelbari-nasri.jpg";
import helaPhoto from "@/assets/team/hela-taghouti.jpg";
import ameliePhoto from "@/assets/team/amelie-bolduc.jpg";
import maryamphoto from "@/assets/team/m.jpeg";


export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  photo: string | null;
  isLeader?: boolean;
  description?: string;
  phone?: string;
  linkedin?: string;
  facebook?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "abdelbari-nasri",
    name: "Abdelbari Nasri",
    role: "Conseiller Senior",
    email: "abdelbari.nasri@agc.ia.ca",
    photo: abdelbariPhoto,
    isLeader: true,
    description: "Expert en planification financière avec plus de 10 ans d'expérience dans l'accompagnement des particuliers et des entreprises vers l'atteinte de leurs objectifs financiers.",
    linkedin: "https://linkedin.com/in/abdelbari-nasri",
  },
  {
    id: "hela-taghouti",
    name: "Hela Taghouti",
    role: "Conseillère Senior",
    email: "hela.taghouti@agc.ia.ca",
    photo: helaPhoto,
    isLeader: true,
    description: "Spécialiste en assurance et protection du patrimoine, passionnée par l'éducation financière et l'accompagnement personnalisé de chaque client.",
    linkedin: "https://linkedin.com/in/hela-taghouti",
  },
  {
    id: "amelie-bolduc",
    name: "Amélie Bolduc",
    role: "Conseillère Senior",
    email: "amelie.bolduc@agc.ia.ca",
    photo: ameliePhoto,
    isLeader: true,
    description: "Conseillère dévouée avec une approche humaine et stratégique, elle aide ses clients à naviguer dans le monde complexe des finances personnelles.",
    linkedin: "https://linkedin.com/in/amelie-bolduc",
  },
  {
    id: "sofiane-lemanaa",
    name: "Sofiane Lemanaa",
    role: "Conseiller Financier",
    email: "sofiane.lemanaa@agc.ia.ca",
    photo: null,
    description: "Conseiller dévoué à simplifier la gestion financière de ses clients avec des solutions adaptées à leurs besoins.",
  },
  {
    id: "maryam-benlimam",
    name: "Maryam Benlimam",
    role: "Conseillère Financière",
    email: "maryam.benlimam@agc.ia.ca",
    photo: maryamphoto,
    description: "Passionnée par l'accompagnement client et la planification financière personnalisée.",
  },
  {
    id: "dalel-djeffel",
    name: "Dalel Djeffel",
    role: "Conseillère Financière",
    email: "dalel.djeffel@agc.ia.ca",
    photo: null,
    description: "Experte dans l'élaboration de stratégies financières sur mesure pour une sécurité à long terme.",
  },
  {
    id: "jonathan-lemay",
    name: "Jonathan Lemay",
    role: "Conseiller Financier",
    email: "jonathan.lemay@agc.ia.ca",
    photo: null,
    description: "Conseiller dynamique offrant des solutions innovantes pour atteindre vos objectifs financiers.",
  },
  {
    id: "valerie-boisvert",
    name: "Valérie Boisvert",
    role: "Conseillère Financière",
    email: "valerie.boisvert@agc.ia.ca",
    photo: null,
    description: "Spécialisée dans l'accompagnement des familles vers une meilleure santé financière.",
  },
  {
    id: "mamadou-seck",
    name: "Mamadou Seck",
    role: "Conseiller Financier",
    email: "mamadou.seck@agc.ia.ca",
    photo: null,
    description: "Conseiller attentif aux besoins de ses clients, offrant des conseils clairs et accessibles.",
  },
  {
    id: "thouraya-saghrouni",
    name: "Thouraya Saghrouni",
    role: "Conseillère Financière",
    email: "thouraya.saghouni@agc.ia.ca",
    photo: null,
    description: "Dédiée à aider ses clients à bâtir un avenir financier solide et serein.",
  },
];

export const getTeamMemberById = (id: string): TeamMember | undefined => {
  return teamMembers.find(member => member.id === id);
};

export const getLeaders = (): TeamMember[] => {
  return teamMembers.filter(member => member.isLeader);
};

export const getAdvisors = (): TeamMember[] => {
  return teamMembers.filter(member => !member.isLeader);
};

// Round-robin lead distribution
let currentAdvisorIndex = 0;

export const getNextAdvisorForRotation = (): TeamMember => {
  const allMembers = teamMembers;
  const advisor = allMembers[currentAdvisorIndex];
  currentAdvisorIndex = (currentAdvisorIndex + 1) % allMembers.length;
  return advisor;
};
