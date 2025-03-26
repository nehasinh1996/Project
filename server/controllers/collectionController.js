import Collection from "../models/collectionModel.js";

// Get all collections
export const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find();
    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
