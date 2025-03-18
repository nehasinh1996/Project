import { useState, useEffect, useRef, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  // Fetch product names when the component mounts
  useEffect(() => {
    fetch("/data/product.json")
      .then((response) => response.json())
      .then((data) => {
        const productNames = data.categories.flatMap((category) =>
          category.subcategories.flatMap((sub) =>
            sub.products.map((product) => ({
              name: product.product_name,
              id: product.id,
            }))
          )
        );
        setSuggestions(productNames);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Memoized filtered suggestions (Performance Improvement)
  const filteredSuggestions = useMemo(() => {
    if (!query) return [];
    return suggestions.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, suggestions]);

  // Update the placeholder text every 3 seconds
  useEffect(() => {
    if (suggestions.length === 0) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % suggestions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [suggestions]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !searchRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setQuery(e.target.value);
    setHighlightIndex(-1);
    setShowDropdown(true);
  };

  // Handle suggestion click
  const handleSuggestionClick = (product) => {
    setQuery(product.name);
    setShowDropdown(false);
    navigate(`/products/${encodeURIComponent(product.name.replace(/\s+/g, "-").toLowerCase())}`);
  };

  // Handle search button click
  const handleSearch = () => {
    if (!query.trim()) return;
    const matchedProduct = suggestions.find(
      (product) =>
        product.name.toLowerCase().replace(/\s+/g, "-") === query.toLowerCase().replace(/\s+/g, "-")
    );

    if (matchedProduct) {
      navigate(`/products/${encodeURIComponent(query.replace(/\s+/g, "-").toLowerCase())}`);
    } else {
      alert("No products found!");
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightIndex((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : filteredSuggestions.length - 1));
    } else if (e.key === "Enter") {
      if (highlightIndex >= 0) {
        handleSuggestionClick(filteredSuggestions[highlightIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  return (
    <div className="relative w-64 mx-auto mt-2 z-50" ref={searchRef}>
      <div className="flex items-center border border-gray-300 rounded-full bg-white shadow-sm h-8">
        <FaSearch
          className="text-gray-500 ml-2 cursor-pointer"
          size={14}
          onMouseDown={handleSearch}
        />
        <input
          type="text"
          className="w-full px-3 py-1 text-sm outline-none text-gray-800 bg-transparent"
          placeholder={`Try ${suggestions[placeholderIndex]?.name || "a product"}`}
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {query && (
          <IoClose
            className="text-gray-500 cursor-pointer mr-2"
            size={16}
            onClick={() => setQuery("")}
          />
        )}
      </div>

      {showDropdown && filteredSuggestions.length > 0 && (
        <ul
          ref={dropdownRef}
          className="absolute left-0 w-full bg-white border border-gray-300 shadow-lg rounded-lg mt-1 max-h-48 overflow-y-auto z-50"
        >
          {filteredSuggestions.map((product, index) => (
            <li
              key={product.id}
              className={`px-3 py-2 text-sm cursor-pointer ${
                index === highlightIndex ? "bg-blue-100" : "hover:bg-blue-50"
              }`}
              onMouseEnter={() => setHighlightIndex(index)}
              onClick={() => handleSuggestionClick(product)}
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
