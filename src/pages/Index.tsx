import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, TrendingUp, Users, Eye, Heart, Share2, DollarSign } from "lucide-react";
import { VideoCarousel } from "@/components/VideoCarousel";
import { MetricsCarousel } from "@/components/MetricsCarousel";

const Index = () => {
  // Vidéos du carousel - Structure optimisée
  const videoShowcase = [
    {
      type: "instagram", // Logo Instagram affiché en haut à gauche
      embedUrl: "https://www.instagram.com/reel/DEDRirKoSZt/", // URL pour ouvrir sur Instagram
      videoUrl: "https://zthzfezwbgtyiorf.public.blob.vercel-storage.com/videos/demo-instagram-1.mp4", // Référence vers le fichier vidéo hébergé
      title: "Pamela - Best club in Paris",
      views: "1.6M vues cumulées", // Champ libre - vous pouvez mettre ce que vous voulez
    },
    {
      type: "instagram", // Logo Instagram affiché en haut à gauche
      embedUrl: "https://www.instagram.com/reel/DPCHU7ijKzj/", // URL pour ouvrir sur Instagram
      videoUrl: "https://zthzfezwbgtyiorf.public.blob.vercel-storage.com/videos/demo-instagram-2.mp4", // Référence vers le fichier vidéo hébergé
      title: "Bon Voyage by Charles B",
      views: "50K vues cumulées", // Champ libre
    },
    {
      type: "instagram", // Logo TikTok affiché en haut à gauche
      embedUrl: "https://www.instagram.com/reel/DOjbJk1iEaq/", // URL pour ouvrir sur TikTok
      videoUrl: "https://zthzfezwbgtyiorf.public.blob.vercel-storage.com/videos/demo-instagram-3.mp4", // Référence vers le fichier vidéo hébergé
      title: "5 clubs où sortir",
      views: "385K vues cumulées", // Champ libre
    },
    {
      type: "instagram", // Logo Instagram affiché en haut à gauche
      embedUrl: "https://www.instagram.com/reel/DQH12CBiIYw/", // URL pour ouvrir sur Instagram
      videoUrl: "https://zthzfezwbgtyiorf.public.blob.vercel-storage.com/videos/demo-instagram-4.mp4", // Référence vers le fichier vidéo hébergé
      title: "Colores @ Chichi",
      views: "10K vues", // Champ libre
    },
    {
      type: "tiktok", // Logo Instagram affiché en haut à gauche
      embedUrl: "https://www.tiktok.com/@nighters.app/video/7550022080033557782", // URL pour ouvrir sur Instagram
      videoUrl: "https://zthzfezwbgtyiorf.public.blob.vercel-storage.com/videos/demo-instagram-5.mp4", // Référence vers le fichier vidéo hébergé
      title: "Boom Boom - Best club in Paris",
      views: "330K vues", // Champ libre
    },
    {
      type: "tiktok", // Logo Instagram affiché en haut à gauche
      embedUrl: "https://www.tiktok.com/@nighters.app/video/7504022682141510934", // URL pour ouvrir sur Instagram
      videoUrl: "https://zthzfezwbgtyiorf.public.blob.vercel-storage.com/videos/demo-instagram-6.mp4", // Référence vers le fichier vidéo hébergé
      title: "Gate Club - Best club in Paris",
      views: "1M vues cumulées", // Champ libre
    },
  ];

  // Images des métriques (screenshots)
  const metricsImages = [
    "https://zthzfezwbgtyiorf.public.blob.vercel-storage.com/metrics/1.png",
    "https://zthzfezwbgtyiorf.public.blob.vercel-storage.com/metrics/2.png", 
    "https://zthzfezwbgtyiorf.public.blob.vercel-storage.com/metrics/3.png",
    "https://zthzfezwbgtyiorf.public.blob.vercel-storage.com/metrics/4.png"
  ];

  const plans = [
    {
      name: "Starter",
      price: "490€",
      period: "/ mois",
      videos: 4,
      nightersPost: 1,
      features: [
        "4 vidéos professionnelles par mois",
        "1 vidéo par mois postée sur Nighters",
        "Optimisation TikTok & Instagram",
        "Stratégie de contenu viral",
      ],
    },
    {
      name: "Premium",
      price: "990€",
      period: "/ mois",
      videos: 10,
      nightersPost: 2,
      featured: true,
      features: [
        "10 vidéos professionnelles par mois",
        "2 vidéos par mois postées sur Nighters",
        "Optimisation TikTok & Instagram",
        "Stratégie de contenu viral",
      ],
    },
  ];

  const stats = [
    { icon: Eye, label: "Vues cumulées", value: "10M+" },
    { icon: TrendingUp, label: "Croissance organique (0€ ads)", value: "98%" },
    { icon: Users, label: "Créateurs à votre service", value: "Sur-mesure" },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero text-foreground">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          
          {/* Logo Nighters - Taille optimisée mobile */}
          <div className="flex justify-center mb-6">
            <img 
              src="/Nighters_pro.png" 
              alt="Nighters Agency" 
              className="h-12 sm:h-16 md:h-20 w-auto drop-shadow-xl hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Mettons en lumière vos{" "}
              <span className="bg-gradient-to-r from-primary via-pink-500 to-primary bg-clip-text text-transparent animate-pulse-glow">
                événements
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Nous maîtrisons l'art de créer du contenu viral.
              <br />
              <span className="text-primary font-semibold">Boostez votre visibilité</span> avec l'équipe derrière Nighters, l'app référence de la nightlife parisienne.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow text-lg px-8 py-6 font-semibold transition-all hover:scale-105"
              onClick={() => window.open("https://zcal.co/nighterspro/intro", "_blank")}
            >
              Réserver un appel
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/50 text-foreground hover:bg-primary/10 text-lg px-8 py-6 hover:scale-105 transition-all"
              onClick={() => window.open("https://www.instagram.com/nighters.app/reels/", "_blank")}
            >
              Nos réalisations
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section - Repositionnée et améliorée */}
      <section className="container mx-auto px-4 py-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-gradient-card border-border/50 p-4 md:p-8 text-center shadow-card">
                <stat.icon className="w-7 h-7 md:w-12 md:h-12 mx-auto mb-4 md:mb-6 text-primary" />
                <div className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 text-foreground">{stat.value}</div>
                <div className="text-sm md:text-lg text-muted-foreground font-medium">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="container mx-auto px-4 py-24 bg-gradient-burgundy">
        <div className="max-w-7xl mx-auto text-center space-y-16">
          <div className="space-y-6">
            <Badge className="bg-primary/20 text-primary border-primary/50 px-8 py-3 text-lg font-medium hover:bg-primary/20 hover:text-primary">
              Résultats concrets
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Des chiffres qui parlent d'eux-mêmes
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Nos contenus génèrent des résultats mesurables, 
              <span className="text-primary font-semibold"> sans dépenser un centime en publicité</span>
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent blur-3xl"></div>
            <div className="relative w-full">
              <MetricsCarousel images={metricsImages} speed={1} />
            </div>
          </div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto text-center space-y-16">
          <div className="space-y-6">
            <Badge className="bg-primary/20 text-primary border-primary/50 px-8 py-3 text-lg font-medium hover:bg-primary/20 hover:text-primary">
              Notre portfolio
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Nos créations qui font le buzz
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Découvrez quelques-unes de nos <span className="text-primary font-semibold">vidéos virales</span> créées pour la scène parisienne
            </p>
          </div>

          <VideoCarousel videos={videoShowcase} />

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/50 text-foreground hover:bg-primary/10"
              onClick={() => window.open("https://www.instagram.com/nighters.app/", "_blank")}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Voir plus sur Instagram
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/50 text-foreground hover:bg-primary/10"
              onClick={() => window.open("https://www.tiktok.com/@nighters.app", "_blank")}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
              Voir plus sur TikTok
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-20" id="pricing">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Plans
          </h2>
          <p className="text-xl text-muted-foreground">
            Choisissez la formule qui correspond à vos ambitions
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`bg-gradient-card border-border/50 p-8 text-left shadow-card relative overflow-hidden ${
                  plan.featured ? "ring-2 ring-primary shadow-glow" : ""
                }`}
              >
                {plan.featured && (
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    Populaire
                  </Badge>
                )}
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-primary">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </Card>
            ))}
          </div>

          {/* CTA intégré */}
          <div className="text-center space-y-6 pt-12">
            <p className="text-xl text-muted-foreground">
            Prêts à faire rayonner vos soirées ?
            </p>
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow text-xl px-12 py-7 font-semibold transition-all hover:scale-105"
              onClick={() => window.open("https://zcal.co/nighterspro/intro", "_blank")}
            >
              Réserver un appel gratuit
            </Button>
            <p className="text-sm text-muted-foreground">
              Réponse sous 24h • Sans engagement
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-border/50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <div className="font-bold text-xl mb-2">Nighters Pro</div>
            <div className="text-sm text-muted-foreground">
              L'expertise virale au service de vos événements
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-6">
              <a 
                href="https://www.instagram.com/nighters.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Instagram
              </a>
              <a 
                href="https://www.tiktok.com/@nighters.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                TikTok
              </a>
              <a 
                href="https://www.nighters.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Nighters App
              </a>
            </div>
            <a 
              href="https://www.nighters.app/terms-and-conditions" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
