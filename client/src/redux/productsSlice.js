import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch products from API
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await fetch("https://project-xb43.onrender.com/api/products");
  if (!response.ok) throw new Error("Failed to fetch products");
  return await response.json();
});

// Redux slice
const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
