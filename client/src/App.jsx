import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

// Import Components
import Layout from "./components/Layout";
import NotFound from "./NotFound";

// Public Pages
import Home from "./Home";
import ProductPage from "./pages/ProductPage/ProductPage";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
  {/* ✅ Public Routes (With Layout) */}
  <Route path="/" element={<Layout><Home /></Layout>} />
  <Route path="/category/:categoryName" element={<Layout><ProductPage /></Layout>} />
  <Route path="/category/:categoryName/:subCategoryName" element={<Layout><ProductPage /></Layout>} />
 
  
  

  {/* ✅ Catch-all 404 Page */}
  <Route path="*" element={<NotFound />} />
</Routes>

      </BrowserRouter>
    </Provider>
  );
};

export default App;
