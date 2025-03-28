const mongoose = require("mongoose");

// ✅ Get all banners
const getBanners = async (_, res) => {
  try {
    const data = await mongoose.connection.db.collection("banner").find().toArray();
    res.json({ banners: data });
  } catch (error) {
    console.error("❌ Error fetching banners:", error);
    res.status(500).json({ error: "Failed to fetch banners" });
  }
};

// ✅ Get banner by category, subcategory, or product name
const getBannerByCategory = async (req, res) => {
  const { categoryName } = req.params;

  try {
    const banner = await mongoose.connection.db.collection("banner").findOne({
      $or: [
        { category_name: categoryName }, // ✅ Match category
        { subcategory_name: categoryName }, // ✅ Match subcategory
        { product_name: categoryName }, // ✅ Match product name
      ],
    });

    if (!banner) {
      res.status(404).json({ error: "Banner not found" });
    } else {
      res.json({ banner });
    }
  } catch (error) {
    console.error("❌ Error fetching banner:", error);
    res.status(500).json({ error: "Failed to fetch banner" });
  }
};

module.exports = { getBanners, getBannerByCategory };
