import mongoose from "mongoose";

// Get all collections
export const getCollections = async (req, res) => {
  try {
    const data = await mongoose.connection.db.collection("collections").find().toArray();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
