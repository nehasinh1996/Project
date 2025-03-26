import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const DynamicBanner = ({ isScrollingUp, isSticky }) => {
  const [offersData, setOffersData] = useState([]);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("API URL:", import.meta.env.VITE_API_URL); // Debug API URL
  
    fetch(`${import.meta.env.VITE_API_URL}/api/offers`)

      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Offers:", data);
        setOffersData(data.offers || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error loading offers:", error);
        setLoading(false);
      });
  }, []);
  

  useEffect(() => {
    if (offersData.length === 0) return;

    const interval = setInterval(() => {
      setCurrentOfferIndex((prev) => (prev + 1) % offersData.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [offersData]);

  const renderMessage = (message, highlight) => {
    if (!highlight) return message;

    const highlights = Array.isArray(highlight) ? highlight : [highlight];
    const regex = new RegExp(`(${highlights.join("|")})`, "gi");

    return message.split(regex).map((part, i) =>
      highlights.includes(part) ? (
        <span key={i} className="text-yellow-400 font-bold mx-1">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div
      className={`w-full bg-black text-white text-center p-1 text-sm font-semibold overflow-hidden transition-transform duration-300 ${
        isScrollingUp && !isSticky ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {loading ? (
        <p className="animate-pulse">Fetching offers...</p>
      ) : offersData.length === 0 ? (
        <p>No offers available.</p>
      ) : (
        <div key={currentOfferIndex} className="flex items-center justify-center gap-3">
          <span className="text-2xl">{offersData[currentOfferIndex]?.sticker}</span>
          <p className="text-sm md:text-sm font-medium">
            {renderMessage(
              offersData[currentOfferIndex]?.message,
              offersData[currentOfferIndex]?.highlight
            )}
          </p>
          <span className="text-2xl">{offersData[currentOfferIndex]?.sticker}</span>
        </div>
      )}
    </div>
  );
};

// ✅ PropTypes with Defaults
DynamicBanner.propTypes = {
  isScrollingUp: PropTypes.bool,
  isSticky: PropTypes.bool,
};

DynamicBanner.defaultProps = {
  isScrollingUp: false,
  isSticky: false,
};

export default DynamicBanner;
