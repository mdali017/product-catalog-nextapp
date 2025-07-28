"use client";
import { usePathname } from "next/navigation";
import NavBar from "@/components/common/NavBar/NavBar";
import Footer from "@/components/common/Footer/Footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

const ConditionalLayout: React.FC<ConditionalLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  // Routes where NavBar and Footer should be hidden
  const hiddenRoutes = ["/login", "/register", "/signup"];
  
  // Check if current route should hide navigation
  const shouldHideNavigation = hiddenRoutes.includes(pathname);

  if (shouldHideNavigation) {
    // Render without NavBar and Footer for auth pages
    return <>{children}</>;
  }

  // Render with NavBar and Footer for regular pages
  return (
    <>
      <NavBar />
      <div className="min-h-[500px]">{children}</div>
      <Footer />
    </>
  );
};

export default ConditionalLayout;