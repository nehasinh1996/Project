import { useState, useEffect } from "react";
import { Carousel } from "@material-tailwind/react";

const CarouselComponent = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("https://project-xb43.onrender.com/api/carousel");

        if (!response.ok) {
          throw new Error(`Failed to load images. Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data || !Array.isArray(data.images)) {
          throw new Error("Invalid response format: Expected an array of images");
        }

        setImages(data.images);
      } catch (error) {
        console.error("Error fetching carousel images:", error.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <Carousel autoplay autoplayDelay={3000} loop className="w-full h-[90vh] mt-10 overflow-hidden">
      {loading ? (
        <div className="w-full h-full flex justify-center items-center bg-gray-200">
          <div className="border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin" />
        </div>
      ) : error || images.length === 0 ? (
        <div className="w-full h-full bg-gray-300 flex justify-center items-center">
          <img 
            src="https://dummyimage.com/1500x800/cccccc/000000&text=No+Image"
            alt="No images available"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        images.map((src, idx) => (
          <div key={idx} className="w-full h-full">
            <img
              src={src}
              alt={`slide ${idx + 1}`}
              className="w-full h-full object-cover transition-opacity duration-700 opacity-0"
              onLoad={(e) => (e.target.style.opacity = 1)} // Smooth fade-in effect
            />
          </div>
        ))
      )}
    </Carousel>
  );
};

export default CarouselComponent;
