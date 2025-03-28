import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Banner = () => {
  const { categoryName, subcategoryName, productName } = useParams();
  const [banner, setBanner] = useState(null);

  // ✅ Determine banner target based on priority
  const getBannerTarget = () => {
    if (categoryName) return categoryName;
    if (subcategoryName) return subcategoryName;
    if (productName) return categoryName; // ✅ Show parent category banner for product
    return null;
  };

  useEffect(() => {
    const fetchBannerData = async () => {
      const target = getBannerTarget();
      if (!target) {
        setBanner(null);
        return;
      }

      try {
        const response = await fetch(
          `https://project-xb43.onrender.com/api/banner/${encodeURIComponent(target)}`
        );

        if (!response.ok) {
          throw new Error("Banner not found");
        }

        const data = await response.json();
        if (data.banners.length > 0) {
          setBanner(data.banners[0]);
        } else {
          setBanner(null);
        }
      } catch (error) {
        console.error("Error fetching banner:", error);
        setBanner(null);
      }
    };

    fetchBannerData();
  }, [categoryName, subcategoryName, productName]);

  if (!banner) {
    return (
      <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">No Banner Available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-64 relative">
      <img
        src={banner.image_url}
        alt={banner.category_name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold">{banner.category_name}</h1>
      </div>
    </div>
  );
};

export default Banner;
