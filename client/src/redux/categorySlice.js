import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Replace with your actual API endpoint
const API_URL = "https://project-xb43.onrender.com/api/categories";

// Async thunk to fetch categories
export const fetchCategories = createAsyncThunk("category/fetchCategories", async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
});

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
