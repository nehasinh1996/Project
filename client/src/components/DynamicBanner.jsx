import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const DynamicBanner = ({ isScrollingUp, isSticky }) => {
  const [offersData, setOffersData] = useState([
    { sticker: "🔥", message: "Limited Time Offer: 30% Off!", highlight: "30% Off" },
    { sticker: "🎁", message: "Buy 1 Get 1 Free on Selected Items!", highlight: "Buy 1 Get 1 Free" }
  ]);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("API URL:", import.meta.env.VITE_API_URL);
  
    fetch(`${import.meta.env.VITE_API_URL}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Offers:", data);
        if (data.offers?.length > 0) {
          setOffersData(data.offers);
        }
      })
      .catch((error) => {
        console.error("❌ Error loading offers:", error);
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
      className={`w-full h-10 bg-black text-white text-center p-1 text-sm font-semibold overflow-hidden transition-transform duration-300 ${
        isScrollingUp && !isSticky ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {offersData.length === 0 ? (
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
