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
    <Carousel autoplay autoplayDelay={3000} loop className="w-full h-[90vh] mt-10 overflow-hidden">
      {loading ? (
        // Show a loading skeleton or spinner
        <div className="w-full h-full flex justify-center items-center bg-gray-200">
          <div className="border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin" />
        </div>
      ) : images.length > 0 ? (
        images.map((src, idx) => (
          <div key={idx} className="w-full h-full">
            <img
              src={src}
              alt={`slide ${idx + 1}`}
              className="w-full h-full object-cover transition-opacity duration-700 opacity-0"
              onLoad={(e) => (e.target.style.opacity = 1)} // Fade-in effect on load
            />
          </div>
        ))
      ) : (
        <div className="w-full h-full bg-gray-300 flex justify-center items-center">
          <img
            src="https://via.placeholder.com/1500x800?text=No+Images+Available"
            alt="No images"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </Carousel>
  );
};

export default CarouselComponent;
