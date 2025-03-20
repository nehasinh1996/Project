import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch categories and products from JSON
export const fetchCategories = createAsyncThunk("search/fetchCategories", async () => {
  const response = await fetch("/data/product.json");
  const data = await response.json();
  return data.categories;
});

const initialState = {
  categories: [],
  searchQuery: "",
  searchResults: [],
  status: "idle",
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.searchResults = state.categories.flatMap((category) =>
        category.subcategories.flatMap((sub) =>
          sub.products.filter((product) =>
            `${product.product_name} ${category.category_name} ${sub.subcategory_name} ${product.concerns.join(" ")} ${product.treatment_type.join(" ")} ${product.ingredients.join(" ")}`
              .toLowerCase()
              .includes(action.payload.toLowerCase())
          )
        )
      );
    },
    clearSearch: (state) => {
      state.searchQuery = "";
      state.searchResults = [];
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
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSearchQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
