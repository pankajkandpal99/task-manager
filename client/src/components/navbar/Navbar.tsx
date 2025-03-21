import React from "react";
import { NavbarItem } from "./NavbarItem";
import { Link } from "react-router-dom";
import { CompanyLogo } from "../logo/CompanyLogo";
import { NavbarItemType } from "../../types/navbar-types/navbarTypes";
import AuthButtons from "../auth/AuthButtons";
import MobileMenu from "./MobileMenu";

interface iAppNavbarProps {
  items: NavbarItemType[];
}

export const Navbar: React.FC<iAppNavbarProps> = ({ items }) => {
  return (
    <nav className="py-2 sticky top-0 z-50 bg-background/80 backdrop-blur-md shadow-md shadow-gray-100 dark:shadow-gray-800 rounded">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <CompanyLogo
            src="/logo.webp"
            alt="MultyComm"
            size="md"
            type="image"
          />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {items.map((item) => (
            <NavbarItem key={item.id} item={item} />
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <AuthButtons />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <MobileMenu items={items} />
        </div>
      </div>
    </nav>
  );
};
