import React from "react";
import { ShoppingCart, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addProductToCart } from "@/redux/features/cart/cartSlice";

// Product interface based on your data structure
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

// Component props interface
interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Use product rating if available, otherwise use defaults
  const rating: number = product.rating?.rate ?? 4.2;
  const reviewCount: number = product.rating?.count ?? 156;

  // Truncate long titles
  const truncateTitle = (title: string, maxLength: number = 45): string => {
    return title.length > maxLength
      ? title.substring(0, maxLength) + "..."
      : title;
  };

  // Handle add to cart click
  const handleAddToCart = async (): Promise<void> => {
    try {
      // Import SweetAlert dynamically (reduces initial bundle size)
      const Swal = await import("sweetalert2");

      // Dispatch the action to add product to cart
      dispatch(
        addProductToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1, // Changed from 0 to 1 since we're adding a new item
        })
      );

      // Show success notification
      Swal.default.fire({
        position: "top-end",
        icon: "success",
        title: "Added to cart!",
        text: `${product.title} has been added to your cart`,
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        background: "#f0fdf4", // green-50
        iconColor: "#16a34a", // green-600
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);

      const Swal = await import("sweetalert2");
      Swal.default.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while adding to cart",
      });
    }
  };

  // Handle details navigation
  const handleViewDetails = (): void => {
    // Navigate to product details page with product ID
    router.push(`/products/${product.id}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      {/* Product Image */}
      <div className="aspect-square bg-gray-100 rounded-md mb-3 flex items-center justify-center">
        <div className="h-[300px] text-4xl text-gray-400">
          <img
            className="h-full w-full object-cover rounded-md"
            src={product?.image}
            alt={product.title}
            onError={(e) => {
              // Fallback if image fails to load
              (e.target as HTMLImageElement).style.display = "none";
              //   @ts-ignore
              (e.target as HTMLImageElement).nextElementSibling!.style.display =
                "block";
            }}
          />
          <div
            style={{ display: "none" }}
            className="flex items-center justify-center h-full text-4xl text-gray-400"
          >
            📦
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        {/* Category */}
        <span className="text-xs text-gray-500 uppercase tracking-wide">
          {product.category}
        </span>

        {/* Title */}
        <h3 className="font-medium text-gray-900 text-sm leading-tight">
          {truncateTitle(product.title)}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          <Star size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-gray-600">{rating}</span>
          <span className="text-xs text-gray-400">({reviewCount})</span>
        </div>

        {/* Price and Cart */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-semibold text-gray-900">
            ${product.price}
          </span>

          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="bg-gray-900 hover:bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center space-x-1"
              aria-label="Add to cart"
            >
              <ShoppingCart size={14} />
              <span>Add</span>
            </button>
            <button
              onClick={handleViewDetails}
              className="bg-indigo-700 hover:bg-indigo-800 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center space-x-1"
              aria-label="View product details"
            >
              <span>Details</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
