import React, { useEffect, useState } from "react";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://project-xb43.onrender.com/api/categories"); // 🌍 Use Deployed API
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="flex flex-wrap gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
      {categories.slice(0, showAll ? categories.length : 5).map((category, index) => (
        <span key={index} className="px-3 py-1 bg-blue-500 text-white rounded-lg">
          {category.category_name}
        </span>
      ))}

      {categories.length > 5 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="px-3 py-1 bg-gray-500 text-white rounded-lg"
        >
          More
        </button>
      )}
    </nav>
  );
};

export default Menu;
