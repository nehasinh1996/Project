import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories, setCategory, setSubcategory } from "../../redux/productsSlice";
import { sortProducts } from "../../redux/sortby";
import Banner from "../../components/Banner";
import ProductCard from "../../components/ProductCard";
import Header from "../../components/Header";
import SortBy from "../../components/SortBy";
import FilterSidebar from "../../components/FilterSidebar";
import { setFilters, clearFilters } from "../../redux/filterSlice";
import { setSearchQuery } from "../../redux/searchSlice";

const ProductPage = () => {
  const { categoryName, subCategoryName, productName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);

  const { products } = useSelector((state) => state.products);
  const { searchQuery, searchResults } = useSelector((state) => state.search);
  const sortBy = useSelector((state) => state.sortBy.sortBy);
  const filters = useSelector((state) => state.filter.filters);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(clearFilters());
    localStorage.removeItem("filters");
    if (categoryName) dispatch(setCategory(categoryName));
    if (subCategoryName) dispatch(setSubcategory(subCategoryName));
  }, [categoryName, subCategoryName, productName, dispatch]);

  useEffect(() => {
    dispatch(setFilters(filters));
  }, [filters, dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");
    if (query) {
      dispatch(setSearchQuery(query));
    }
  }, [location.search, dispatch]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setShowDropdown(false);
    navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
    dispatch(setSearchQuery(searchQuery));
  };

  const handleSuggestionClick = (product) => {
    dispatch(setSearchQuery(product.product_name));
    setShowDropdown(false);
    navigate(`/products/${encodeURIComponent(product.product_name.replace(/\s+/g, "-").toLowerCase())}`);
  };

  const decodedProductName = decodeURIComponent(productName || "").toLowerCase().replace(/\s+/g, "-");

  const filteredProducts = products.filter((product) => {
    const matchesConcerns =
      filters.concerns.length === 0 ||
      filters.concerns.some((concern) => product.concerns.includes(concern));

    const matchesTreatmentType =
      filters.treatment_type.length === 0 ||
      filters.treatment_type.some((type) => product.treatment_type.includes(type));

    const matchesIngredients =
      filters.ingredients.length === 0 ||
      filters.ingredients.some((ingredient) => product.ingredients.includes(ingredient));

    return matchesConcerns && matchesTreatmentType && matchesIngredients;
  });

  const displayedProducts = searchQuery
    ? searchResults
    : productName
    ? filteredProducts.filter(
        (p) => p.product_name.toLowerCase().replace(/\s+/g, "-") === decodedProductName
      )
    : sortProducts(filteredProducts, sortBy);

  return (
    <>
      <Header />
      <Banner />
      <div className="relative flex items-center justify-end px-2 py-3 border-b border-gray-300">
        <div className="fixed left-0 top-1/4 z-50">
          <FilterSidebar />
        </div>
        <SortBy />
      </div>
      
      {/* ✅ Search Input */}
      <div className="flex justify-center mt-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="border border-gray-300 rounded px-3 py-2 w-64"
          placeholder="Search products..."
        />
        <button onClick={handleSearch} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">Search</button>
      </div>

      {/* ✅ Search Suggestions Dropdown */}
      {showDropdown && searchResults.length > 0 && (
        <ul ref={dropdownRef} className="absolute left-0 w-64 bg-white border border-gray-300 shadow-lg rounded-lg mt-1 max-h-48 overflow-y-auto">
          {searchResults.map((product, index) => (
            <li
              key={product.id}
              className={`px-3 py-2 text-sm cursor-pointer ${index === highlightIndex ? "bg-blue-100" : "hover:bg-blue-50"}`}
              onMouseEnter={() => setHighlightIndex(index)}
              onClick={() => handleSuggestionClick(product)}
            >
              {product.product_name}
            </li>
          ))}
        </ul>
      )}

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-8 gap-y-10 mt-6">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <p className="text-center text-gray-500 col-span-full">No products found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;