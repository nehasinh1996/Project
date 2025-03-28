import { useState, useEffect } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://project-xb43.onrender.com/api/categories");

        if (!response.ok) {
          throw new Error(`Failed to load categories. Status: ${response.status}`);
        }

        const data = await response.json();

        console.log("API Response:", data); // ✅ Debug: Log API response

        if (!data || typeof data !== "object") {
          throw new Error("Invalid response format: Expected an object");
        }

        // Adjust this based on actual response structure
        const categoriesArray = data.categories || data || [];

        if (!Array.isArray(categoriesArray)) {
          throw new Error("Invalid response format: Expected an array of categories");
        }

        setCategories(categoriesArray);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading categories...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : categories.length > 0 ? (
        <ul>
          {categories.slice(0, 5).map((category, idx) => (
            <li key={idx}>{category.name || category}</li>
          ))}
        </ul>
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  );
};

export default Categories;
