import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";

const ProductPage = () => {
  return (
    <>
      <Header />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Menu</h2>
        <p>Fetching menu logic will be added later...</p>
      </div>
    </>
  );
};

export default ProductPage;
