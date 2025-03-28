import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, setSubcategory } from "../redux/productsSlice";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.products);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredMore, setHoveredMore] = useState(false);

  // ✅ Fetch categories only if status is idle
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  // ✅ Show loading or error states
  if (status === "loading") {
    return <p className="text-center text-gray-700">Loading categories...</p>;
  }
  if (status === "failed") {
    return <p className="text-center text-red-500">Error loading categories.</p>;
  }

  // ✅ Split categories into visible and extra categories
  const visibleCategories = categories.slice(0, 5);
  const extraCategories = categories.slice(5);

  return (
    <ul className="flex space-x-6 text-gray-700 font-medium relative">
      {/* ✅ Render first 5 categories */}
      {visibleCategories.map((category) => (
        <li
          key={category.category_name}
          className="relative group"
          onMouseEnter={() => setHoveredCategory(category.category_name)}
          onMouseLeave={() => setHoveredCategory(null)}
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
                className="absolute left-0 mt-2 bg-white shadow-lg rounded-md p-4 z-50 w-auto min-w-max whitespace-nowrap"
              >
                {category.subcategories.map((sub) => (
                  <Link
                    key={sub.subcategory_name}
                    to={`/category/${category.category_name}/${sub.subcategory_name}`}
                    onClick={() => dispatch(setSubcategory(sub.subcategory_name))}
                    className="block hover:text-black"
                  >
                    {sub.subcategory_name}
                  </Link>
                ))}
              </motion.div>
            )}
        </li>
      ))}

      {/* ✅ Show 'More' dropdown for extra categories */}
      {extraCategories.length > 0 && (
        <li
          className="relative group"
          onMouseEnter={() => setHoveredMore(true)}
          onMouseLeave={() => setHoveredMore(false)}
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
              className="absolute left-0 mt-2 bg-white shadow-lg rounded-md p-4 z-50 w-auto min-w-max whitespace-nowrap"
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
