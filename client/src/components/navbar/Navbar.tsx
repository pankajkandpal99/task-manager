import React from "react";
import { NavbarItem } from "./NavbarItem";
import { Link } from "react-router-dom";
// import { CompanyLogo } from "../logo/CompanyLogo";
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
    <nav className="sticky top-0 z-40 bg-[#0a101f]/90 backdrop-blur-md py-4 border-b border-[#1e293b]/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#6FFFB4] to-[#3694FF] rounded-full blur opacity-70 group-hover:opacity-100 transition duration-200" />
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#6FFFB4] to-[#3694FF] rounded-full blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative bg-[#0a101f] rounded-full p-1">
                <CompanyLogo
                  type="image"
                  src="../../../../public/Final GHG Logo.png"
                  alt="GameHiGame logo"
                  size="md"
                  className="w-10 h-10"
                />
              </div>
            </div>
          </motion.div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6FFFB4] to-[#3694FF]">
            GameHiGame
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4">
          {items.map((item) => (
            <NavbarItem key={item.id} item={item} />
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 lg:gap-6">
          {/* <motion.div
            className="flex items-center gap-2 bg-[#121a2a]/90 px-4 py-2 rounded-lg border border-[#1e293b]/50 shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <img
                src="https://img.icons8.com/fluency/48/wallet.png"
                className="h-6 w-6"
                alt="Wallet"
              />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#6FFFB4] rounded-full animate-pulse" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-semibold">₹5,000</span>
              <span className="text-xs text-[#6FFFB4]">+₹200</span>
            </div>
          </motion.div> */}

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex">
            <AuthButtons />
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <MobileMenu items={items} />
          </div>
        </div>
      </div>
    </nav>
  );
};
