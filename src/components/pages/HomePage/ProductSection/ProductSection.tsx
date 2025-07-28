"use client";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import { useGetAllProductsQuery } from "@/redux/services/productService/productApi";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

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

const ProductSection: React.FC = () => {
  // Get search term from Redux
  const searchTerm = useSelector((state: any) => state.searchTerm.searchTerm);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  //@ts-ignore
  const {
    data: allProducts,
    isLoading,
    error,
  } = useGetAllProductsQuery(undefined);

  // Update filtered products when search term or allProducts changes
  // Update filtered products when search term or allProducts changes
  useEffect(() => {
    if (allProducts) {
      if (searchTerm.trim() === "") {
        setFilteredProducts(allProducts);
      } else {
        const filtered = allProducts.filter(
          (product: any) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
      }
    }
  }, [searchTerm, allProducts]);

  // Handle search from NavBar
  // const handleSearch = (value: string) => {
  //   setSearchTerm(value);
  // };

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

  // Empty state for no products at all
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

  // Empty state for search results
  if (searchTerm && filteredProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Optional Section Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Search Results
          </h2>
          <p className="text-gray-600">No products found for "{searchTerm}"</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Optional Section Title - Changes based on search */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {searchTerm ? `Search Results for "${searchTerm}"` : "Our Products"}
        </h2>
        <p className="text-gray-600">
          {searchTerm
            ? `${filteredProducts.length} products found`
            : "Discover our amazing collection"}
        </p>
      </div>

      {/* Products Grid - Fixed grid classes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
