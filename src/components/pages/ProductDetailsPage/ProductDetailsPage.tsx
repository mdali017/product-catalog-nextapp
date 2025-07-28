"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useGetProductByIdQuery } from "@/redux/services/productService/productApi";
import { ShoppingCart, Star, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

// Product interface
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

const ProductDetailsPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const productId = params?.productDetails;
  const productIdStr: string | undefined = Array.isArray(productId)
    ? productId[1]
    : productId;

  // Fetch product by ID
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductByIdQuery(productIdStr!, {
    skip: !productIdStr,
  });

  // Handle add to cart
  const handleAddToCart = (): void => {
    if (product) {
      console.log("Adding to cart:", product);
      alert(`${product.title} added to cart!`);
    }
  };

  // Handle back navigation
  const handleGoBack = (): void => {
    router.back();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The product you're looking for doesn't exist.
          </p>
          <button
            onClick={handleGoBack}
            className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">
            Product Not Found
          </h2>
          <button
            onClick={handleGoBack}
            className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const rating = product.rating?.rate ?? 4.2;
  const reviewCount = product.rating?.count ?? 156;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Protected Content Badge */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
        <p className="text-sm text-green-800">
          🔒 This is a protected page - only authenticated users can view
          product details!
        </p>
      </div>

      {/* Back Button */}
      <button
        onClick={handleGoBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to Products</span>
      </button>

      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl text-gray-400">
              📦
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Category */}
          <div>
            <span className="text-sm text-gray-500 uppercase tracking-wide">
              {product.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  className={
                    index < Math.floor(rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">{rating}</span>
            <span className="text-sm text-gray-400">
              ({reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-gray-900">
            ${product.price}
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Add to Cart Button */}
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-md font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </button>
            <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
