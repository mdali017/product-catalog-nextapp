import ProductDetailsPage from "@/components/pages/ProductDetailsPage/ProductDetailsPage";
import ProtectedRoute from "@/components/routes/ProtectedRoute";
import React from "react";

const ProductDetails: React.FC = () => {
  return (
    <ProtectedRoute>
      <ProductDetailsPage />
    </ProtectedRoute>
  );
};

export default ProductDetails;
