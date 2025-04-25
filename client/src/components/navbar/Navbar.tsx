import React from "react";
import { NavbarItem } from "./NavbarItem";
import { Link } from "react-router-dom";
import { NavbarItemType } from "../../types/navbarTypes";
import AuthButtons from "../auth/AuthButtons";
import MobileMenu from "./MobileMenu";
import { motion } from "framer-motion";
import { CompanyLogo } from "../logo/CompanyLogo";

interface iAppNavbarProps {
  items: NavbarItemType[];
}

export const Navbar: React.FC<iAppNavbarProps> = ({ items }) => {
  return (
    <nav className="sticky top-0 z-40 bg-background/80 dark:bg-[#0a101f]/80 backdrop-blur-md py-4 border-b border-border/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-70 group-hover:opacity-100 transition duration-200" />
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative bg-background rounded-full p-1">
                <CompanyLogo
                  type="image"
                  src="../../../../public/Final GHG Logo.png"
                  alt="GL"
                  size="md"
                  className="w-10 h-10"
                />
              </div>
            </div>
          </motion.div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            GameHiGame
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {items.map((item) => (
            <NavbarItem key={item.id} item={item} />
          ))}
        </div>

        <div className="flex items-center gap-3 lg:gap-6">
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex">
            <AuthButtons />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileMenu items={items} />
          </div>
        </div>
      </div>
    </nav>
  );
};
