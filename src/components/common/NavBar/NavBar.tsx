"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "@/redux/store/store";
import { logout } from "@/redux/features/auth/authSlice";
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  Heart,
  Home,
  LogOut,
} from "lucide-react";

// NavBar Props Interface
interface NavBarProps {
  cartItemsCount?: number;
  favoritesCount?: number;
  onSearch?: (value: string) => void;
  searchQuery?: string;
}

const NavBar: React.FC<NavBarProps> = ({
  cartItemsCount = 0,
  favoritesCount = 0,
  onSearch = () => {},
  searchQuery = "",
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Get auth state from Redux
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>(searchQuery);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  // Toggle mobile menu
  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle login - navigate to login page
  const handleLogin = (): void => {
    router.push("/login");
  };

  // Handle logout - dispatch logout action
  const handleLogout = (): void => {
    dispatch(logout());
    router.push("/");
    setIsMobileMenuOpen(false); // Close mobile menu after logout
  };

  // Handle navigation
  const handleNavigation = (path: string): void => {
    router.push(path);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation("/")}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">PC</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                ProductCatalog
              </span>
            </button>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => handleNavigation("/")}
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </button>

            {isAuthenticated && (
              <button className="relative flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                <Heart className="h-4 w-4" />
                <span>Favorites</span>
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </button>
            )}

            {isAuthenticated && (
              <button className="relative flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                <ShoppingCart className="h-4 w-4" />
                <span>Cart</span>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            )}

            {/* User Info (if authenticated) */}
            {isAuthenticated && user && (
              <div className="flex items-center space-x-2 text-gray-700 px-3 py-2">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Hi, {user.firstName || user.username}
                </span>
              </div>
            )}

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-blue-600 p-2 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => handleNavigation("/")}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 w-full px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </button>

              {isAuthenticated && (
                <button className="flex items-center justify-between w-full text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-5 w-5" />
                    <span>Favorites</span>
                  </div>
                  {favoritesCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {favoritesCount}
                    </span>
                  )}
                </button>
              )}

              {isAuthenticated && (
                <button className="flex items-center justify-between w-full text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors">
                  <div className="flex items-center space-x-2">
                    <ShoppingCart className="h-5 w-5" />
                    <span>Cart</span>
                  </div>
                  {cartItemsCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </button>
              )}

              {/* User Info (Mobile) */}
              {isAuthenticated && user && (
                <div className="flex items-center space-x-2 text-gray-700 px-3 py-2 border-t border-gray-200 mt-2 pt-2">
                  <User className="h-5 w-5" />
                  <span className="text-base font-medium">
                    Welcome, {user.firstName || user.username}!
                  </span>
                </div>
              )}

              <div className="border-t border-gray-200 pt-3 mt-3">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full bg-red-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-red-700 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="flex items-center space-x-2 w-full bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span>Login</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
