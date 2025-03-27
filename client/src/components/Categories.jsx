import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, setSubcategory } from "../redux/productsSlice";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.products);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredMore, setHoveredMore] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  if (status === "loading") return <p>Loading categories...</p>;
  if (status === "failed") return <p>Error loading categories.</p>;

  const visibleCategories = categories.slice(0, 5);
  const extraCategories = categories.slice(5);

  return (
    <ul className="flex space-x-6 text-gray-700 font-medium relative">
      {visibleCategories.map((category) => (
        <li
          key={category.category_name}
          className="relative group"
          onMouseEnter={() => setHoveredCategory(category.category_name)}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          <Link to={`/category/${category.category_name}`} className="hover:text-black">
            {category.category_name}
          </Link>
          {hoveredCategory === category.category_name && category.subcategories?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 mt-2 bg-white rounded-md p-4 z-50 w-auto min-w-max whitespace-nowrap"
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

      {extraCategories.length > 0 && (
        <li
          className="relative group"
          onMouseEnter={() => setHoveredMore(true)}
          onMouseLeave={() => setHoveredMore(false)}
        >
          <span className="hover:text-black cursor-pointer flex items-center">
            More <ChevronDownIcon className="w-4 h-4 ml-1" />
          </span>
          {hoveredMore && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 mt-2 bg-white rounded-md p-4 z-50 w-auto min-w-max whitespace-nowrap"
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
