import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Fetch categories from backend API
export const fetchCategories = createAsyncThunk("products/fetchCategories", async () => {
  const response = await fetch("https://your-backend-url.vercel.app/api/categories");
  const data = await response.json();
  return data.categories; // ✅ Returns categories from MongoDB
});

// ✅ Fetch a single product by ID
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId) => {
    const response = await fetch(`https://your-backend-url.vercel.app/api/products/${productId}`);
    if (!response.ok) {
      throw new Error("Product not found");
    }
    const product = await response.json();
    return product;
  }
);

const initialState = {
  categories: [],
  selectedCategory: localStorage.getItem("selectedCategory") || null,
  selectedSubcategory: localStorage.getItem("selectedSubcategory") || null,
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
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.status = "failed";
        state.selectedProduct = null;
      });
  },
});

export const { setCategory, setSubcategory } = productsSlice.actions;
export default productsSlice.reducer;
