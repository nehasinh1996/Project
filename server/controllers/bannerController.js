const mongoose = require("mongoose");

// ✅ Get all banners
const getBanners = async (_, res) => {
  try {
    const data = await mongoose.connection.db
      .collection("banner")
      .find()
      .toArray();
    res.json({ banners: data });
  } catch (error) {
    console.error("❌ Error fetching banners:", error);
    res.status(500).json({ error: "Failed to fetch banners" });
  }
};

// ✅ Get banner by category, subcategory, or product
const getBannerByCategory = async (req, res) => {
  const target = decodeURIComponent(req.params.target); // ✅ Decode target (Lip%20Care -> Lip Care)
  try {
    const banner = await mongoose.connection.db
      .collection("banner")
      .find({
        category_name: target, // ✅ Check if category name matches
      })
      .toArray();

    if (banner.length === 0) {
      return res.status(404).json({ error: "Banner not found" });
    }

    res.json({ banners: banner });
  } catch (error) {
    console.error("❌ Error fetching banner by category:", error);
    res.status(500).json({ error: "Failed to fetch banner" });
  }
};

module.exports = { getBanners, getBannerByCategory };
