import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, Clock, ArrowRight, User, Search, Tag } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "5 stratégies pour optimiser votre épargne en 2026",
    excerpt: "Découvrez comment maximiser votre potentiel d'épargne avec ces stratégies éprouvées par nos experts en planification financière.",
    author: "Abdelbari Nasri",
    date: "25 janvier 2026",
    readTime: "5 min",
    category: "Épargne",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
    featured: true,
  },
  {
    id: "2",
    title: "L'importance de l'assurance vie dans votre planification",
    excerpt: "Pourquoi l'assurance vie est un pilier essentiel de votre sécurité financière et celle de vos proches.",
    author: "Hela Taghouti",
    date: "20 janvier 2026",
    readTime: "4 min",
    category: "Assurance",
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80",
  },
  {
    id: "3",
    title: "Préparer sa retraite : par où commencer ?",
    excerpt: "Un guide pratique pour bien planifier votre retraite, peu importe votre âge ou votre situation financière actuelle.",
    author: "Amélie Bolduc",
    date: "15 janvier 2026",
    readTime: "7 min",
    category: "Retraite",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80",
  },
  {
    id: "4",
    title: "Les erreurs financières les plus courantes à éviter",
    excerpt: "Apprenez des erreurs des autres pour bâtir une base financière solide et éviter les pièges courants.",
    author: "Sofiane Lemanaa",
    date: "10 janvier 2026",
    readTime: "6 min",
    category: "Conseils",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
  },
  {
    id: "5",
    title: "Comment protéger votre patrimoine familial",
    excerpt: "Stratégies et outils pour assurer la protection et la transmission de votre patrimoine à vos héritiers.",
    author: "Maryam Benlimam",
    date: "5 janvier 2026",
    readTime: "5 min",
    category: "Patrimoine",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
  },
  {
    id: "6",
    title: "Investir intelligemment : les bases pour débutants",
    excerpt: "Une introduction aux concepts fondamentaux de l'investissement pour ceux qui veulent faire fructifier leur argent.",
    author: "Jonathan Lemay",
    date: "1 janvier 2026",
    readTime: "8 min",
    category: "Investissement",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  },
];

const categories = ["Tous", "Épargne", "Assurance", "Retraite", "Conseils", "Patrimoine", "Investissement"];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const filteredPosts = regularPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block text-gold-500 text-sm font-medium tracking-wider uppercase mb-4">
              Notre Blogue
            </span>
            <h1 className="text-foreground mb-6">
              Conseils et <span className="text-gradient-gold">expertises</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Restez informé avec nos articles sur la finance personnelle, l'assurance 
              et la planification patrimoniale.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un article..."
                className="w-full pl-12 pr-4 py-4 bg-secondary border border-transparent rounded-2xl
                         text-foreground placeholder:text-muted-foreground
                         focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-gold-500 text-white"
                      : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Featured Post */}
          {featuredPost && selectedCategory === "Tous" && !searchQuery && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              <Link to={`/blog/${featuredPost.id}`} className="group block">
                <div className="relative rounded-3xl overflow-hidden bg-background border border-border">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="aspect-[4/3] md:aspect-auto">
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-gold-100 text-gold-600 rounded-full text-xs font-medium">
                          À la une
                        </span>
                        <span className="px-3 py-1 bg-secondary text-muted-foreground rounded-full text-xs">
                          {featuredPost.category}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 group-hover:text-gold-500 transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <User className="w-4 h-4" />
                            {featuredPost.author}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {featuredPost.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {featuredPost.readTime}
                          </span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gold-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/blog/${post.id}`} className="group block h-full">
                  <div className="h-full bg-background rounded-2xl border border-border overflow-hidden hover:border-gold-300 hover:shadow-xl transition-all duration-300">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Tag className="w-3.5 h-3.5 text-gold-500" />
                        <span className="text-xs font-medium text-gold-500">{post.category}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-gold-500 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{post.author}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground text-lg">
                Aucun article trouvé pour cette recherche.
              </p>
            </motion.div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
