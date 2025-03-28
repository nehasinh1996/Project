import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState(null);
  const [hoveredMore, setHoveredMore] = useState(false);
  const dropdownTimeoutRef = useRef(null); // ✅ Ref for handling dropdown delay

  // ✅ Fetch categories from MongoDB API
  useEffect(() => {
    fetch("https://project-xb43.onrender.com/api/categories")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched categories:", data.categories);
        setCategories(data.categories);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);
  

  // ✅ Split categories into visible and extra categories
  const visibleCategories = categories.slice(0, 5);
  const extraCategories = categories.slice(5);

  // ✅ Handle mouse enter for subcategory with delay
  const handleMouseEnterSubcategory = (subcategoryName) => {
    clearTimeout(dropdownTimeoutRef.current);
    setHoveredSubcategory(subcategoryName);
  };

  // ✅ Handle mouse leave with delay to prevent disappearance
  const handleMouseLeaveSubcategory = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setHoveredSubcategory(null);
    }, 200);
  };

  return (
    <ul className="flex space-x-6 text-gray-700 font-medium relative">
      {/* ✅ Render first 5 categories */}
      {visibleCategories.map((category) => (
        <li
          key={category.category_name}
          className="relative group"
          onMouseEnter={() => {
            clearTimeout(dropdownTimeoutRef.current);
            setHoveredCategory(category.category_name);
          }}
          onMouseLeave={() => {
            dropdownTimeoutRef.current = setTimeout(() => {
              setHoveredCategory(null);
              setHoveredSubcategory(null);
            }, 200); // ✅ Delay to prevent disappearance
          }}
        >
          <Link
            to={`/category/${category.category_name}`}
            className="hover:text-black"
          >
            {category.category_name}
          </Link>

          {/* ✅ Show subcategories on hover */}
          {hoveredCategory === category.category_name &&
            category.subcategories?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 mt-2 bg-white shadow-lg rounded-md p-4 z-50 min-w-max"
                onMouseEnter={() => clearTimeout(dropdownTimeoutRef.current)}
                onMouseLeave={() => {
                  dropdownTimeoutRef.current = setTimeout(
                    () => setHoveredCategory(null),
                    200
                  );
                }}
              >
                {category.subcategories.map((sub) => (
                  <div
                    key={sub.subcategory_name}
                    className="relative group-hover:block hover:text-black"
                    onMouseEnter={() => handleMouseEnterSubcategory(sub.subcategory_name)}
                    onMouseLeave={handleMouseLeaveSubcategory}
                  >
                    <Link
                      to={`/category/${category.category_name}/${sub.subcategory_name}`}
                      className="block hover:text-black"
                    >
                      {sub.subcategory_name}{" "}
                      <ChevronRightIcon className="inline w-4 h-4 ml-1" />
                    </Link>

                    {/* ✅ Show products on subcategory hover */}
                    {hoveredSubcategory === sub.subcategory_name &&
                      sub.products?.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute left-full top-0 ml-2 bg-white shadow-lg rounded-md p-4 z-50 min-w-max"
                          onMouseEnter={() => clearTimeout(dropdownTimeoutRef.current)}
                          onMouseLeave={handleMouseLeaveSubcategory}
                        >
                          {sub.products.map((product) => (
                            <Link
                              key={product.product_name}
                              to={`/category/${category.category_name}/${sub.subcategory_name}/${product.product_name
                                .replace(/\s+/g, "-")
                                .toLowerCase()}`}
                              className="block hover:text-black"
                            >
                              {product.product_name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                  </div>
                ))}
              </motion.div>
            )}
        </li>
      ))}

      {/* ✅ Show 'More' dropdown for extra categories */}
      {extraCategories.length > 0 && (
        <li
          className="relative group"
          onMouseEnter={() => {
            clearTimeout(dropdownTimeoutRef.current);
            setHoveredMore(true);
          }}
          onMouseLeave={() => {
            dropdownTimeoutRef.current = setTimeout(
              () => setHoveredMore(false),
              200
            );
          }}
        >
          <span className="hover:text-black cursor-pointer flex items-center">
            More <ChevronDownIcon className="w-4 h-4 ml-1" />
          </span>

          {/* ✅ Show extra categories on hover */}
          {hoveredMore && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 mt-2 bg-white shadow-lg rounded-md p-4 z-50 min-w-max"
              onMouseEnter={() => clearTimeout(dropdownTimeoutRef.current)}
              onMouseLeave={() => {
                dropdownTimeoutRef.current = setTimeout(
                  () => setHoveredMore(false),
                  200
                );
              }}
            >
              {extraCategories.map((category) => (
                <Link
                  key={category.category_name}
                  to={`/category/${category.category_name}`}
                  className="block hover:text-black"
                >
                  {category.category_name}
                </Link>
              ))}
            </motion.div>
          )}
        </li>
      )}
    </ul>
  );
};

export default Categories;
