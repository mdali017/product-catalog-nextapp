"use client";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import { useGetAllProductsQuery } from "@/redux/services/productService/productApi";
import React from "react";

// Product interface - should match your API response
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image?: string;
  rating?: {
    rate: number;
    count: number;
  };
}

// API Response type
interface ProductsApiResponse {
  data?: Product[];
  isLoading: boolean;
  error?: any;
}

const ProductSection: React.FC = () => {
  //@ts-ignore
  const {
    data: allProducts,
    isLoading,
    error,
  }: {
    data: Product[] | undefined;
    isLoading: boolean;
    error: any;
  } = useGetAllProductsQuery(undefined);

  console.log(allProducts);

  // Handle add to cart function
  const handleAddToCart = (product: Product): void => {
    console.log("Adding to cart:", product);
    // Add your cart logic here
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Loading skeleton */}
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-lg h-80 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <h2 className="text-xl font-semibold mb-2">Error loading products</h2>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!allProducts || allProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">
          <h2 className="text-xl font-semibold mb-2">No products found</h2>
          <p>Check back later for new products.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Optional Section Title */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Products</h2>
        <p className="text-gray-600">Discover our amazing collection</p>
      </div>

      {/* Products Grid - Fixed grid classes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProducts.map((product: Product) => (
          <ProductCard
            key={product.id} // Use product.id instead of index for better React performance
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* Optional Load More Button */}
      {/* {allProducts.length > 0 && (
        <div className="text-center mt-8">
          <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-md font-medium transition-colors">
            Load More Products
          </button>
        </div>
      )} */}
    </div>
  );
};

export default ProductSection;
