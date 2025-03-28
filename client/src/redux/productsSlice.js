import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Fetch categories from backend API
// ✅ Fetch categories from MongoDB Atlas
export const fetchCategories = createAsyncThunk("products/fetchCategories", async () => {
  const response = await fetch("https://project-xb43.onrender.com/api/categories");
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  const data = await response.json();
  return data.categories; // ✅ Returns categories from MongoDB
});

// ✅ Fetch a single product by ID
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId) => {
    const response = await fetch(`https://project-xb43.onrender.com/api/products/${productId}`);
    if (!response.ok) {
      throw new Error("Product not found");
    }
    const product = await response.json();
    return product;
  }
);

// ✅ Safely retrieve local storage values
let storedCategory, storedSubcategory;
try {
  storedCategory = localStorage.getItem("selectedCategory");
  storedSubcategory = localStorage.getItem("selectedSubcategory");
} catch (error) {
  console.error("Error reading from localStorage:", error);
}

// ✅ Initial state with safe storage values
const initialState = {
  categories: [],
  selectedCategory: storedCategory || null,
  selectedSubcategory: storedSubcategory || null,
  products: [],
  selectedProduct: null,
  status: "idle",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      localStorage.setItem("selectedCategory", action.payload);
      state.selectedSubcategory = null;
      localStorage.removeItem("selectedSubcategory");
    },
    setSubcategory: (state, action) => {
      state.selectedSubcategory = action.payload;
      localStorage.setItem("selectedSubcategory", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch categories lifecycle
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.status = "failed";
        state.categories = []; // Clear on error
      })

      // ✅ Fetch product by ID lifecycle
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.status = "failed";
        state.selectedProduct = null; // Clear on error
      });
  },
});

// ✅ Export actions and reducer
export const { setCategory, setSubcategory } = productsSlice.actions;
export default productsSlice.reducer;
