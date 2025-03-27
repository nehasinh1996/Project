import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SelfCare = () => {
  const [selfCareItems, setSelfCareItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSelfCareItems = async () => {
      try {
        const response = await fetch("https://project-xb43.onrender.com/api/selfcare");
        if (!response.ok) {
          throw new Error("Failed to load self-care items");
        }
        const data = await response.json();
        setSelfCareItems(data);
      } catch (error) {
        console.error("Error fetching self-care items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSelfCareItems();
  }, []);

  return (
    <div className="text-center px-6">
      <motion.h1
        className="text-5xl font-bold mb-12 text-gray-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Indulge in Self-Care
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 justify-center">
        {loading ? (
          <p className="text-gray-500 col-span-full">Loading self-care items...</p>
        ) : selfCareItems.length > 0 ? (
          selfCareItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <Link to={item.route}>
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="h-44 w-44 rounded-full object-cover border-4 border-transparent transition-all duration-300 ease-in-out"
                  whileHover={{
                    scale: 1.08,
                    borderColor: "#ff69b4",
                    boxShadow: "0px 0px 25px rgba(255, 105, 180, 0.6)",
                  }}
                />
                <motion.h1
                  className="text-2xl mt-4 text-gray-800 font-semibold transition-all duration-300"
                  whileHover={{ color: "#ff69b4" }}
                >
                  {item.title}
                </motion.h1>
              </Link>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No self-care items available.</p>
        )}
      </div>
    </div>
  );
};

export default SelfCare;
