import { useState, useEffect } from "react";
import { Carousel } from "@material-tailwind/react";

const CarouselComponent = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("https://project-xb43.onrender.com/api/carouselImages");

        if (!response.ok) {
          throw new Error("Failed to load images");
        }
        const data = await response.json();
        setImages(data?.images || []);
      } catch (error) {
        console.error("Error fetching carousel images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <Carousel autoplay autoplayDelay={3000} loop className="w-full h-[80vh] mt-10 overflow-hidden">
      {loading
        ? Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="w-full h-full bg-gray-300 animate-pulse flex items-center justify-center"
            />
          ))
        : images.length > 0
        ? images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`slide ${idx + 1}`}
              className="w-full h-full object-cover transition-opacity duration-700 opacity-0"
              onLoad={(e) => (e.target.style.opacity = 1)}
            />
          ))
        : (
          <img
            src="https://via.placeholder.com/1500x800?text=No+Images+Available"
            alt="No images"
            className="w-full h-full object-cover"
          />
        )}
    </Carousel>
  );
};

export default CarouselComponent;
