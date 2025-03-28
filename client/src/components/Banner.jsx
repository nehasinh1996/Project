import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Banner = () => {
  const { categoryName, subCategoryName, productName, productId } = useParams();
  const [bannerData, setBannerData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Determine the banner source (category/subcategory/product)
  const fetchBannerData = async () => {
    let url = "";

    // ✅ 1. If productName or productId exists, fetch product details
    if (productName || productId) {
      url = `https://project-xb43.onrender.com/api/products/${productId || productName}`;
    }
    // ✅ 2. If category or subcategory is selected, fetch banner from the parent
    else if (categoryName) {
      url = `https://project-xb43.onrender.com/api/banner/${categoryName}`;
    }

    try {
      if (url) {
        const response = await fetch(url);
        const data = await response.json();

        if (data.banner) {
          setBannerData(data.banner); // ✅ Correct banner from API
        } else {
          setBannerData({ banner_image: "/default-banner.jpg", description: "Explore Our Best Collections" });
        }
      }
    } catch (error) {
      console.error("Error fetching banner:", error);
      setBannerData({ banner_image: "/default-banner.jpg", description: "Explore Our Best Collections" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBannerData();
  }, [categoryName, subCategoryName, productName, productId]);

  if (loading) return null; // ✅ Prevent render while loading

  return (
    <>
      {bannerData && (
        <div
          className="relative w-full h-64 bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${bannerData.banner_image})` }}
        >
          <div className="text-center bg-black bg-opacity-50 p-4 rounded-md">
            <h1 className="text-white text-2xl font-bold">
              {categoryName
                ? `Explore ${categoryName}`
                : subCategoryName
                ? `Explore ${subCategoryName}`
                : productName
                ? "Product Details"
                : "Explore Our Best Collections"}
            </h1>
            <p className="text-gray-300 mt-2">{bannerData.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
