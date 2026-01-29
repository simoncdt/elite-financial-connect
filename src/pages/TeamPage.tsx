import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AppointmentModal } from "@/components/AppointmentModal";
import { teamMembers, getLeaders, getAdvisors } from "@/lib/team-data";
import { Mail, Linkedin, Calendar, ArrowRight, Users, Award, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const TeamPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdvisor, setSelectedAdvisor] = useState("");

  const leaders = getLeaders();
  const advisors = getAdvisors();

  const handleBookAppointment = (advisorId: string) => {
    setSelectedAdvisor(advisorId);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="section-container py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block text-gold-500 text-sm font-medium tracking-wider uppercase mb-4">
              Notre équipe
            </span>
            <h1 className="text-foreground mb-6">
              Les <span className="text-gradient-gold">Simplificateurs</span> à votre service
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Une équipe de professionnels passionnés, dédiés à simplifier votre vie financière 
              et à vous accompagner vers l'atteinte de vos objectifs.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mb-20"
          >
            {[
              { icon: Users, value: "10+", label: "Conseillers experts" },
              { icon: Award, value: "15+", label: "Années d'expérience" },
              { icon: Heart, value: "500+", label: "Clients satisfaits" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 md:p-6 rounded-2xl bg-secondary/50">
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-gold-500 mx-auto mb-3" />
                <p className="text-2xl md:text-3xl font-semibold text-foreground mb-1">{stat.value}</p>
                <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Leaders Section */}
          <div className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-semibold text-center text-foreground mb-12"
            >
              Nos conseillers seniors
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {leaders.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-background rounded-3xl border border-border overflow-hidden hover:border-gold-300 hover:shadow-xl transition-all duration-300">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                    </div>

                    {/* Content */}
                    <div className="p-6 -mt-16 relative">
                      <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                      <p className="text-gold-500 text-sm font-medium mb-3">{member.role}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {member.description}
                      </p>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleBookAppointment(member.id)}
                          className="flex-1 py-3 bg-gold-500 text-white rounded-xl font-medium text-sm
                                   hover:bg-gold-600 transition-all flex items-center justify-center gap-2"
                        >
                          <Calendar className="w-4 h-4" />
                          Prendre RDV
                        </button>
                        <a
                          href={`mailto:${member.email}`}
                          className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center
                                   text-muted-foreground hover:text-foreground hover:bg-gray-200 transition-all"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center
                                     text-muted-foreground hover:text-foreground hover:bg-gray-200 transition-all"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      {/* Linktree Link */}
                      <Link
                        to={`/conseiller/${member.id}`}
                        className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-gold-500 transition-colors"
                      >
                        Voir le profil complet
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="divider mb-16" />

          {/* Advisors Section */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-semibold text-center text-foreground mb-4"
            >
              Notre équipe de conseillers
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-muted-foreground mb-12 max-w-xl mx-auto"
            >
              Des professionnels dévoués prêts à vous accompagner dans tous vos projets financiers.
            </motion.p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {advisors.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group"
                >
                  <div className="bg-background rounded-2xl border border-border p-5 
                               hover:border-gold-300 hover:shadow-lg transition-all duration-300 h-full">
                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-2xl overflow-hidden mb-4">
                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 
                          flex items-center justify-center 
                          group-hover:from-gold-100 group-hover:to-gold-50 transition-all">
                          <span className="text-xl font-medium text-gray-400 group-hover:text-gold-600 transition-colors">
                            {member.name.split(" ").map((n) => n[0]).join("")}
                          </span>
                        </div>
                      )}
                    </div>


                    {/* Info */}
                    <h4 className="font-semibold text-foreground mb-1 group-hover:text-gold-600 transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-muted-foreground text-sm mb-4">{member.role}</p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleBookAppointment(member.id)}
                        className="flex-1 py-2.5 bg-secondary text-foreground rounded-xl text-xs font-medium
                                 hover:bg-gold-500 hover:text-white transition-all flex items-center justify-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        RDV
                      </button>
                      <a
                        href={`mailto:${member.email}`}
                        className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center
                                 text-muted-foreground hover:text-foreground hover:bg-gray-200 transition-all"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>

                    {/* Profile Link */}
                    <Link
                      to={`/conseiller/${member.id}`}
                      className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-gold-500 transition-colors"
                    >
                      Profil
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-container py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-navy-900 to-navy-950 rounded-3xl p-8 md:p-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Prêt à simplifier vos finances?
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Prenez rendez-vous avec l'un de nos conseillers et commencez votre parcours 
              vers une meilleure santé financière.
            </p>
            <button
              onClick={() => {
                setSelectedAdvisor("");
                setIsModalOpen(true);
              }}
              className="px-8 py-4 bg-gold-500 text-white rounded-full font-medium
                       hover:bg-gold-600 transition-all transform hover:scale-105
                       shadow-lg shadow-gold-500/25"
            >
              Prendre rendez-vous maintenant
            </button>
          </motion.div>
        </section>
      </main>

      <Footer />
      
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preselectedAdvisor={selectedAdvisor}
      />
    </div>
  );
};

export default TeamPage;
