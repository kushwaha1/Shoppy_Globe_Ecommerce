import React, { useState, useEffect, useRef } from 'react';
import { ImageOff } from 'lucide-react';

const LazyImage = ({
  src,
  alt,
  className = '',
  placeholder = 'bg-gray-200',
  errorPlaceholder = 'bg-gray-100'
}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !imageSrc) {
            setImageSrc(src);
            observer.unobserve(entry.target); // Stop observing once loaded
          }
        });
      },
      { rootMargin: '50px', threshold: 0.01 }
    );

    observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, [src, imageSrc]);

  const handleLoad = () => setImageLoaded(true);
  const handleError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <>
      {!imageLoaded && !imageError && (
        <div className={`w-full h-full ${placeholder} animate-pulse`} />
      )}

      {imageError && (
        <div className={`w-full h-full ${errorPlaceholder} flex items-center justify-center`}>
          <ImageOff className="w-8 h-8 text-gray-400" />
        </div>
      )}

      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </>
  );
};

export default LazyImage;
