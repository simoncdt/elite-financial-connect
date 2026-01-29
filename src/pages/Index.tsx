import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Team } from "@/components/Team";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { TeamLite } from "@/components/TeamLite";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />

        {/* Section Team principale : seuls les leaders avec photo */}
        <section id="team-leaders">
          <TeamLite />
        </section>

        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
