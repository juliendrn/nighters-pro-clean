import { useEffect, useState, useRef, useCallback } from "react";

interface MetricsCarouselProps {
  images: string[];
  speed?: number;
}

export const MetricsCarousel = ({ 
  images, 
  speed = 1 
}: MetricsCarouselProps) => {
  const [translateX, setTranslateX] = useState(0);
  const animationRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Optimisation pour mobile : utiliser requestAnimationFrame au lieu de setInterval
  const animate = useCallback(() => {
    setTranslateX(prev => {
      // Calculer la largeur d'une série d'images avec une valeur plus précise
      const singleSetWidth = images.length * 320; // Ajusté pour mobile
      const newPosition = prev + speed;
      
      // Si on dépasse la largeur d'une série, on soustrait cette largeur
      // pour créer un défilement infini sans saccade
      return newPosition >= singleSetWidth ? newPosition - singleSetWidth : newPosition;
    });
    
    animationRef.current = requestAnimationFrame(animate);
  }, [images.length, speed]);

  useEffect(() => {
    // Démarrer l'animation
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  // Dupliquer les images pour un défilement infini
  const duplicatedImages = [...images, ...images];

  return (
    <div className="w-full overflow-hidden" ref={containerRef}>
      <div 
        className="flex gap-4 sm:gap-8 py-6 will-change-transform"
        style={{ 
          width: 'max-content',
          transform: `translate3d(-${translateX}px, 0, 0)`,
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }}
      >
        {duplicatedImages.map((image, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 will-change-transform"
            style={{ 
              height: '160px',
              width: 'auto',
              minWidth: '280px',
              maxWidth: '320px'
            }}
          >
            <img
              src={image}
              alt={`Métrique ${(index % images.length) + 1}`}
              className="h-full w-auto object-contain bg-white"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
