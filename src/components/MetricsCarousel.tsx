import { useEffect, useState } from "react";

interface MetricsCarouselProps {
  images: string[];
  speed?: number;
}

export const MetricsCarousel = ({ 
  images, 
  speed = 1 
}: MetricsCarouselProps) => {
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTranslateX(prev => {
        // Calculer la largeur d'une série d'images (approximation)
        const singleSetWidth = images.length * 350; // Largeur approximative d'une série
        const newPosition = prev + speed;
        
        // Si on dépasse la largeur d'une série, on soustrait cette largeur
        // pour créer un défilement infini sans saccade
        return newPosition >= singleSetWidth ? newPosition - singleSetWidth : newPosition;
      });
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [images.length, speed]);

  // Dupliquer les images pour un défilement infini
  const duplicatedImages = [...images, ...images];

  return (
    <div className="w-full overflow-hidden">
      <div 
        className="flex gap-8 py-6 transition-transform duration-75 ease-linear"
        style={{ 
          width: 'max-content',
          transform: `translateX(-${translateX}px)`
        }}
      >
        {duplicatedImages.map((image, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            style={{ 
              height: '200px',
              width: 'auto',
              minWidth: '300px',
              maxWidth: '400px'
            }}
          >
            <img
              src={image}
              alt={`Métrique ${(index % images.length) + 1}`}
              className="h-full w-auto object-contain bg-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
