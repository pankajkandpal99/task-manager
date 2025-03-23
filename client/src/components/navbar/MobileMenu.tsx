import React, { useState } from "react";
import { NavbarItem } from "./NavbarItem";
import { NavbarItemType } from "../../types/navbar-types/navbarTypes";
import AuthButtons from "../auth/AuthButtons";
import { motion, AnimatePresence } from "framer-motion";
import { X, User } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface MobileMenuProps {
  items: NavbarItemType[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, token } = useSelector((state: RootState) => state.auth);

  const menuVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  const displayName = user?.username || "Guest";
  const displayEmail = user?.email || "guest@email.com";
  const isGuest = !user || !token;

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white p-2 rounded-lg hover:bg-[#121a2a]/50 transition-colors"
        aria-label="Toggle mobile menu"
      >
        {isOpen ? (
          <X size={24} strokeWidth={2} />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 min-h-screen w-72 bg-[#0a101f] border-l border-[#1e293b] shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-4 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#6FFFB4] to-[#3694FF] rounded-full blur opacity-70" />
                      <div className="relative bg-[#0a101f] rounded-full p-1">
                        <img
                          src="https://img.icons8.com/fluency/96/controller.png"
                          className="h-8 w-8"
                          alt="Logo"
                        />
                      </div>
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6FFFB4] to-[#3694FF]">
                      MultyComm
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-[#94a3b8] hover:text-white rounded-full hover:bg-[#121a2a] transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* User Profile Information - Works for both guest and logged-in users */}
                <motion.div
                  variants={itemVariants}
                  className={`mb-4 bg-[#121a2a] p-4 rounded-lg border border-[#1e293b] shadow-md ${
                    isGuest ? "opacity-75" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative">
                      <div
                        className={`absolute -inset-1 ${
                          isGuest ? "bg-gray-500/20" : "bg-[#3694FF]/20"
                        } rounded-full blur-sm`}
                      ></div>
                      <div
                        className={`relative flex items-center justify-center w-10 h-10 ${
                          isGuest ? "bg-gray-500/20" : "bg-[#3694FF]/20"
                        } rounded-full`}
                      >
                        <User
                          size={20}
                          className={
                            isGuest ? "text-gray-400" : "text-[#3694FF]"
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-white">
                        {displayName}
                      </span>
                      <span className="text-xs text-[#94a3b8]">
                        {isGuest ? "Not logged in" : "Logged in"}
                      </span>
                    </div>
                  </div>
                  <div className="bg-[#0a101f]/60 p-2 rounded-md">
                    <span className="text-sm text-[#94a3b8]">Email</span>
                    <div className="text-sm font-medium text-white truncate">
                      {displayEmail}
                    </div>
                  </div>
                </motion.div>

                {/* Decorative line */}
                <div className="h-px w-full bg-gradient-to-r from-[#6FFFB4]/20 via-[#3694FF]/20 to-[#6FFFB4]/20 mb-6"></div>

                {/* Menu Items with animation */}
                <nav className="flex-1 space-y-1">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      custom={index}
                      className="overflow-hidden"
                    >
                      <div className="py-1 px-2 rounded-lg hover:bg-[#121a2a]/60 transition-colors">
                        <NavbarItem
                          item={item}
                          isMobile
                          onClick={() => setIsOpen(false)}
                        />
                      </div>
                    </motion.div>
                  ))}
                </nav>

                {/* Decorative elements */}
                <div className="my-6 relative">
                  <div className="absolute left-0 w-32 h-32 bg-[#6FFFB4]/5 rounded-full blur-xl -translate-x-1/2"></div>
                  <div className="absolute right-0 w-24 h-24 bg-[#3694FF]/5 rounded-full blur-xl translate-x-1/2"></div>
                  <div className="h-px w-full bg-[#1e293b] relative"></div>
                </div>

                {/* Mobile Auth Buttons */}
                <motion.div
                  variants={itemVariants}
                  className="mb-auto bottom-0"
                >
                  <AuthButtons isMobile />
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
