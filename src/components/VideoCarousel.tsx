import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video } from "lucide-react";

// Fonction pour convertir les liens Instagram/TikTok en URLs d'embed
const getEmbedUrl = (url: string, type: string): string => {
  if (type === "instagram") {
    // Extraire l'ID du post Instagram (support pour /p/ et /reel/)
    const postIdMatch = url.match(/\/p\/([^\/\?]+)/) || url.match(/\/reel\/([^\/\?]+)/);
    if (postIdMatch) {
      // Utiliser l'API d'embed officielle d'Instagram avec paramètres optimisés
      return `https://www.instagram.com/p/${postIdMatch[1]}/embed/?hidecaption=1&hide_media=0&autoplay=1&embed_type=video&hide_media=0&hide_caption=1&hide_media=0`;
    }
    return url;
  } else if (type === "tiktok") {
    const videoIdMatch = url.match(/\/video\/(\d+)/);
    if (videoIdMatch) {
      return `https://www.tiktok.com/embed/${videoIdMatch[1]}`;
    }
    return url;
  }
  return url;
};

// Fonction pour nettoyer l'URL et extraire l'ID
const cleanUrl = (url: string, type: string): string => {
  if (type === "instagram") {
    // Nettoyer l'URL Instagram
    const cleanUrl = url.split('?')[0]; // Enlever les paramètres
    return cleanUrl;
  } else if (type === "tiktok") {
    // Nettoyer l'URL TikTok
    const cleanUrl = url.split('?')[0]; // Enlever les paramètres
    return cleanUrl;
  }
  return url;
};

// Composant pour gérer l'affichage des vidéos avec autoplay
const VideoEmbed = ({ video, isActive, onVideoEnd }: { video: VideoItem; isActive: boolean; onVideoEnd: () => void }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoLoad = () => {
    console.log("✅ Vidéo chargée avec succès, active:", isActive);
    setIsLoading(false);
    // Pas d'autoplay automatique
  };

  const handleVideoError = (e: any) => {
    console.error("❌ Erreur de chargement vidéo:", e);
    setHasError(true);
    setIsLoading(false);
  };

  const handleVideoEnd = () => {
    console.log("🎬 Vidéo terminée, passage à la suivante");
    setIsPlaying(false);
    onVideoEnd();
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  // Pas d'autoplay automatique - contrôle manuel uniquement
  useEffect(() => {
    if (!isActive && videoRef.current) {
      console.log("🎬 Vidéo inactive, pause...");
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  // Utiliser directement la référence vidéo fournie
  const videoUrl = video.videoUrl || "https://zthzfezwbgtyiorf.public.blob.vercel-storage.com/videos/demo-instagram-1.mp4"; // Fallback temporaire
  console.log("🎬 Tentative de chargement:", videoUrl, "pour", video.type);
  console.log("🎬 Vidéo active:", isActive);

  if (hasError) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 text-muted-foreground bg-gradient-to-br from-muted/50 to-muted/30">
        <div className="relative">
          <Video className="w-16 h-16" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-primary-foreground">
              {video.type === "tiktok" ? "T" : "I"}
            </span>
          </div>
        </div>
        <div className="text-center px-4">
          <div className="text-sm font-medium mb-2">Vidéo {video.type === "tiktok" ? "TikTok" : "Instagram"}</div>
          <div className="text-xs text-muted-foreground mb-3">
            Vidéo non disponible
          </div>
          <a 
            href={cleanUrl(video.embedUrl, video.type)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 underline text-xs bg-primary/10 px-3 py-1 rounded-full transition-all hover:bg-primary/20"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              {video.type === "tiktok" ? (
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              ) : (
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              )}
            </svg>
            Voir sur {video.type === "tiktok" ? "TikTok" : "Instagram"}
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      
      {/* Vidéo principale - élément central */}
      <video
        ref={videoRef}
        src={videoUrl}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay={isActive} // Autoplay seulement si la vidéo est active
        muted={!isActive}
        loop={false} // Pas de loop pour permettre le passage à la suivante
        playsInline
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        onCanPlay={handleVideoLoad}
        onEnded={handleVideoEnd}
        onPlay={handlePlay}
        onPause={handlePause}
        preload="metadata" // Précharger seulement les métadonnées
        controls={false}
        key={`${video.videoUrl}-${isActive}`} // Force le rechargement quand la vidéo change
      />
      
      
      {/* Logo de la plateforme en haut à gauche - cliquable */}
      <a 
        href={cleanUrl(video.embedUrl, video.type)}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-3 left-3 z-20 bg-black/70 backdrop-blur-sm rounded-full p-2 hover:bg-black/80 transition-colors"
        title={`Voir sur ${video.type === "tiktok" ? "TikTok" : "Instagram"}`}
      >
        {video.type === "tiktok" ? (
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
          </svg>
        ) : (
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        )}
      </a>
      
      {/* Bouton Play/Pause en haut à droite */}
      <button
        onClick={togglePlayPause}
        className="absolute top-3 right-3 z-20 bg-black/70 backdrop-blur-sm rounded-full p-2 hover:bg-black/80 transition-colors"
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
        ) : (
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>
    </>
  );
};

interface VideoItem {
  type: string; // "tiktok" ou "instagram" - utilisé pour le logo
  embedUrl: string; // URL pour ouvrir quand on clique sur le logo
  videoUrl: string; // Référence vers le fichier vidéo hébergé
  title: string; // Nom de la vidéo
  views: string; // Champ libre (pas de "vues" par défaut)
}

interface VideoCarouselProps {
  videos: VideoItem[];
}

export const VideoCarousel = ({ videos }: VideoCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Forcer la première vidéo à être active au chargement
  useEffect(() => {
    console.log("🎬 Carousel initialisé, vidéo active:", activeIndex);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    snapToNearest();
  };

  const getCardDimensions = () => {
    if (!containerRef.current) return { cardWidth: 0, gap: 24 };
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    // Calculer la largeur basée sur le breakpoint actuel
    let cardWidthPercent = 0.7; // mobile par défaut
    if (containerWidth >= 1024) cardWidthPercent = 0.28; // lg
    else if (containerWidth >= 768) cardWidthPercent = 0.35; // md
    else if (containerWidth >= 640) cardWidthPercent = 0.45; // sm
    
    const cardWidth = containerWidth * cardWidthPercent;
    const gap = 24;
    return { cardWidth, gap };
  };

  const snapToNearest = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const { cardWidth, gap } = getCardDimensions();
    const totalWidth = cardWidth + gap;
    const newIndex = Math.round(container.scrollLeft / totalWidth);
    const clampedIndex = Math.min(Math.max(0, newIndex), videos.length - 1);
    setActiveIndex(clampedIndex);
    scrollToIndex(clampedIndex);
  };

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const { cardWidth, gap } = getCardDimensions();
    const totalWidth = cardWidth + gap;
    
    // Centrer la carte en calculant l'offset pour la centrer dans le viewport
    const containerWidth = container.offsetWidth;
    const centerOffset = (containerWidth - cardWidth) / 2;
    const targetScroll = (index * totalWidth) - centerOffset + (gap / 2);
    
    console.log("🎬 Scroll vers l'index:", index, "scroll:", targetScroll);
    
    container.scrollTo({
      left: Math.max(0, targetScroll),
      behavior: "smooth",
    });
  };

  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index);
    scrollToIndex(index);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isDragging) return;
      const container = containerRef.current;
      const { cardWidth, gap } = getCardDimensions();
      const totalWidth = cardWidth + gap;
      const containerWidth = container.offsetWidth;
      const centerOffset = (containerWidth - cardWidth) / 2;
      const adjustedScroll = container.scrollLeft + centerOffset - (gap / 2);
      const newIndex = Math.round(adjustedScroll / totalWidth);
      const clampedIndex = Math.min(Math.max(0, newIndex), videos.length - 1);
      
      // Seulement mettre à jour si l'index a vraiment changé
      if (clampedIndex !== activeIndex) {
        console.log("🎬 Changement de vidéo active:", activeIndex, "->", clampedIndex);
        setActiveIndex(clampedIndex);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [isDragging, videos.length, activeIndex]);

  return (
    <div className="space-y-8">
      {/* Carousel container */}
      <div
        ref={containerRef}
        className={`flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8 px-4 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {videos.map((video, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={index}
              className={`flex-shrink-0 w-[70%] sm:w-[45%] md:w-[35%] lg:w-[28%] snap-center transition-all duration-700 ease-in-out cursor-pointer ${
                isActive
                  ? "scale-100 opacity-100"
                  : "scale-90 opacity-50 blur-[2px]"
              }`}
              style={{
                transform: isActive ? "scale(1)" : "scale(0.9)",
              }}
              onClick={() => {
                console.log("🎬 Clic sur vidéo:", index);
                setActiveIndex(index);
                scrollToIndex(index);
              }}
            >
              <Card className="bg-gradient-card border-border/50 p-4 shadow-card hover:shadow-glow transition-all h-full">
                <div className="space-y-4">
                  {/* Vidéo embed - aspect ratio 9:16 */}
                  <div className={`relative w-full aspect-[9/16] bg-muted rounded-lg overflow-hidden ${video.type === 'instagram' ? 'instagram-embed' : ''}`}>
                    <VideoEmbed 
                      video={video} 
                      isActive={isActive} 
                      onVideoEnd={() => {
                        // Passer à la vidéo suivante
                        const nextIndex = (index + 1) % videos.length;
                        setActiveIndex(nextIndex);
                        scrollToIndex(nextIndex);
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{video.title}</h3>
                    <div className="text-sm text-muted-foreground">
                      {video.views}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Custom Progress Indicators */}
      <div className="flex justify-center gap-3 px-4">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => handleIndicatorClick(index)}
            className="group relative"
            aria-label={`Voir vidéo ${index + 1}`}
          >
            <div
              className={`h-2 rounded-full transition-all duration-700 ease-in-out ${
                index === activeIndex
                  ? "w-12 bg-primary shadow-glow"
                  : "w-8 bg-muted/60 hover:bg-primary/50"
              }`}
            >
              {index === activeIndex && (
                <div className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-primary/30 rounded-full animate-pulse-glow" />
              )}
            </div>
          </button>
        ))}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Masquer les éléments UI d'Instagram dans les embeds */
        iframe[src*="instagram.com"] {
          overflow: hidden;
        }
        
        /* Styles pour masquer les éléments indésirables */
        .instagram-embed {
          position: relative;
          overflow: hidden;
        }
        
        .instagram-embed::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: transparent;
          z-index: 1;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};
