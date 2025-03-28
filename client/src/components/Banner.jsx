import { useParams } from "react-router-dom";

const Banner = ({ bannerData }) => {
  const { categoryName, subCategoryName, productName } = useParams();

  // ✅ Check if banner data exists in MongoDB (fetched via Redux)
  const bannerImage = bannerData?.banner_image || "/default-banner.jpg";
  const bannerText = bannerData?.description || "Explore Our Best Collections";

  // ✅ Show banner only when category, subcategory, or product is selected
  const showBanner = categoryName || subCategoryName || productName;

  return (
    <>
      {showBanner && (
        <div
          className="relative w-full h-64 bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${bannerImage})` }}
        >
          <div className="text-center bg-black bg-opacity-50 p-4 rounded-md">
            <h1 className="text-white text-2xl font-bold">
              {categoryName
                ? `Explore ${categoryName}`
                : subCategoryName
                ? `Explore ${subCategoryName}`
                : "Product Details"}
            </h1>
            <p className="text-gray-300 mt-2">{bannerText}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
