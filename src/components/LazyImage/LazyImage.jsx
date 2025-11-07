import React, { useState, useEffect, useRef } from 'react';
import { ImageOff } from 'lucide-react';

/**
 * LazyImage Component
 * 
 * This component loads images lazily (only when they are near viewport)
 * It shows a placeholder while loading and an error placeholder if the image fails to load.
 * 
 * Props:
 * - src: string → URL of the image
 * - alt: string → alt text for the image
 * - className: string → additional classes for styling
 * - placeholder: string → TailwindCSS class for loading placeholder background
 * - errorPlaceholder: string → TailwindCSS class for error placeholder background
 */
const LazyImage = ({
  src,
  alt,
  className = '',
  placeholder = 'bg-gray-200',
  errorPlaceholder = 'bg-gray-100'
}) => {
  const [imageSrc, setImageSrc] = useState(null); // Actual image URL to load
  const [imageLoaded, setImageLoaded] = useState(false); // Tracks if image finished loading
  const [imageError, setImageError] = useState(false); // Tracks if image failed to load
  const imgRef = useRef(null); // Ref to the <img> element

  // Reset image state when src changes
  useEffect(() => {
    setImageSrc(null);
    setImageLoaded(false);
    setImageError(false);
  }, [src]);

  /**
   * Lazy loading using IntersectionObserver
   * The image is only loaded when it is near the viewport
   */
  useEffect(() => {
    if (!imgRef.current || imageSrc) return; // Do nothing if image is already set

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If image enters viewport, set the imageSrc to trigger actual loading
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.unobserve(entry.target); // Stop observing once loaded
          }
        });
      },
      { rootMargin: '50px', threshold: 0.01 } // Trigger slightly before entering viewport
    );

    observer.observe(imgRef.current); // Start observing the image element

    // Cleanup observer when component unmounts
    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, [src, imageSrc]);

  // Handle successful image load
  const handleLoad = () => setImageLoaded(true);

  // Handle image loading error
  const handleError = () => {
    setImageError(true);
    setImageLoaded(true); // Stop showing loading placeholder
  };

  return (
    <>
      {/* Loading placeholder: shown while image is loading */}
      {!imageLoaded && !imageError && (
        <div className={`w-full h-full ${placeholder} animate-pulse`} />
      )}

      {/* Error placeholder: shown if image fails to load */}
      {imageError && (
        <div className={`w-full h-full ${errorPlaceholder} flex items-center justify-center`}>
          <ImageOff className="w-8 h-8 text-gray-400" />
        </div>
      )}

      {/* Actual image element */}
      <img
        ref={imgRef} // Reference for lazy loading
        src={imageSrc} // Will only load when near viewport
        alt={alt}
        className={`${className} transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} // Fade-in effect
        onLoad={handleLoad} // Set loaded state when image finishes loading
        onError={handleError} // Show error placeholder if loading fails
      />
    </>
  );
};

export default LazyImage;