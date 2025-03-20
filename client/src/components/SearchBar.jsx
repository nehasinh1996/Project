import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, fetchCategories } from "../redux/searchSlice";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);

  const { searchQuery, searchResults } = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    dispatch(setSearchQuery(e.target.value));

    if (e.target.value.trim()) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
    setHighlightIndex(-1);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setShowDropdown(false);

    // Check if the entered query matches a product in searchResults
    const matchedProduct = searchResults.find(
      (product) =>
        product.product_name.toLowerCase() === searchQuery.toLowerCase()
    );

    if (matchedProduct) {
      // Navigate to the specific product page if exact match found
      navigate(
        `/products/${encodeURIComponent(
          matchedProduct.product_name.replace(/\s+/g, "-").toLowerCase()
        )}`
      );
    } else {
      // Otherwise, navigate to the search results page
      navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : searchResults.length - 1
      );
    } else if (e.key === "Enter") {
      if (highlightIndex >= 0 && searchResults.length > 0) {
        handleSuggestionClick(searchResults[highlightIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (product) => {
    dispatch(setSearchQuery(product.product_name));
    setShowDropdown(false);
    navigate(
      `/products/${encodeURIComponent(
        product.product_name.replace(/\s+/g, "-").toLowerCase()
      )}`
    );
  };

  return (
    <div className="relative w-64 mx-auto mt-2 z-50" ref={searchRef}>
      <div className="flex items-center border border-gray-300 rounded-full bg-white shadow-sm h-8">
        <FaSearch
          className="text-gray-500 ml-2 cursor-pointer"
          size={14}
          onClick={handleSearch} // Clicking search icon now checks for exact match
        />
        <input
          type="text"
          className="w-full px-3 py-1 text-sm outline-none text-gray-800 bg-transparent"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {searchQuery && (
          <IoClose
            className="text-gray-500 cursor-pointer mr-2"
            size={16}
            onClick={() => {
              dispatch(setSearchQuery(""));
              setShowDropdown(false);
            }}
          />
        )}
      </div>

      {showDropdown && searchResults.length > 0 && (
        <ul
          ref={dropdownRef}
          className="absolute left-0 w-full bg-white border border-gray-300 shadow-lg rounded-lg mt-1 max-h-48 overflow-y-auto"
        >
          {searchResults.map((product, index) => (
            <li
              key={product.id}
              className={`px-3 py-2 text-sm cursor-pointer ${
                index === highlightIndex ? "bg-blue-100" : "hover:bg-blue-50"
              }`}
              onMouseEnter={() => setHighlightIndex(index)}
              onClick={() => handleSuggestionClick(product)}
            >
              {product.product_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
