import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, setCategory, setSubcategory } from "../../redux/productsSlice";
import { sortProducts } from "../../redux/sortby";
import Banner from "../../components/Banner"; // ✅ Correctly fetching from MongoDB
import ProductCard from "../../components/ProductCard";
import Header from "../../components/Header";
import SortBy from "../../components/SortBy";
import FilterSidebar from "../../components/FilterSidebar";
import { setFilters, clearFilters } from "../../redux/filterSlice";

const ProductPage = () => {
  const { categoryName, subCategoryName, productName } = useParams();
  const dispatch = useDispatch();

  const { products, categories } = useSelector((state) => state.products);
  const sortBy = useSelector((state) => state.sortBy.sortBy);
  const filters = useSelector((state) => state.filter.filters);

  // ✅ Fetch categories from MongoDB Atlas once
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // ✅ Set category and subcategory based on URL
  useEffect(() => {
    dispatch(clearFilters());
    if (categoryName) {
      dispatch(setCategory(categoryName));
    }
    if (subCategoryName) {
      dispatch(setSubcategory(subCategoryName));
    }
  }, [categoryName, subCategoryName, dispatch]);

  useEffect(() => {
    dispatch(setFilters(filters));
  }, [filters, dispatch]);

  // ✅ Find the parent category from categories (MongoDB data)
  const parentCategory =
    categories.find(
      (cat) =>
        cat.category_name === categoryName ||
        cat.subcategories?.some(
          (sub) =>
            sub.subcategory_name.toLowerCase() === subCategoryName?.toLowerCase()
        ) ||
        cat.subcategories?.some((sub) =>
          sub.products?.some(
            (prod) =>
              prod.product_name.toLowerCase().replace(/\s+/g, "-") ===
              productName?.toLowerCase()
          )
        )
    ) || {};

  // ✅ Pass banner data to Banner from MongoDB Atlas
  const bannerData = parentCategory;

  // ✅ Filter products dynamically based on category, subcategory, and product name
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

  // ✅ Dynamically filter displayed products
  const displayedProducts = subCategoryName
    ? filteredProducts.filter(
        (p) => p.subcategory_name.toLowerCase() === subCategoryName.toLowerCase()
      )
    : productName
    ? filteredProducts.filter(
        (p) =>
          p.product_name.toLowerCase().replace(/\s+/g, "-") ===
          productName.toLowerCase()
      )
    : sortProducts(filteredProducts, sortBy);

  return (
    <>
      <Header />

      {/* ✅ Pass MongoDB banner data to Banner */}
      <Banner bannerData={bannerData} />

      <div className="relative flex items-center justify-end px-2 py-3 border-b border-gray-300">
        <div className="fixed left-0 top-1/4 z-50">
          <FilterSidebar />
        </div>
        <SortBy />
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-8 gap-y-10 mt-6">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No products found.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
