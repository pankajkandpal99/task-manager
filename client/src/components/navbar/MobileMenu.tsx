import React from "react";
import { NavbarItem } from "./NavbarItem";
import { NavbarItemType } from "../../types/navbarTypes";
import AuthButtons from "../auth/AuthButtons";
import { motion } from "framer-motion";
import { X, User, Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerPortal,
  DrawerTrigger,
} from "../ui/drawer";

interface MobileMenuProps {
  items: NavbarItemType[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ items }) => {
  const { authenticated } = useSelector((state: RootState) => state.auth);
  const { currentUser } = useSelector((state: RootState) => state.user);

  const displayName = currentUser?.name || "Guest";
  const displayEmail = currentUser?.email;
  const isGuest = !authenticated;

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

  return (
    <div className="lg:hidden">
      <Drawer>
        <DrawerTrigger asChild>
          <button
            className="text-foreground p-2 rounded-lg hover:bg-muted/50 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <Menu size={24} strokeWidth={2} />
          </button>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerContent className="fixed inset-y-0 right-0 h-full w-72 max-h-screen bg-background/90 dark:bg-[#0a101f]/90 border-l border-border/30 backdrop-blur-lg z-50">
            <div className="h-full flex flex-col max-h-screen">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-70" />
                    <div className="relative bg-background rounded-full p-1">
                      {/* <CompanyLogo
                        type="image"
                        src="../../../../public/Final GHG Logo.png"
                        alt="GameHiGame logo"
                        size="md"
                        className="w-8 h-8"
                      /> */}
                    </div>
                  </div>
                  <span className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    GameHiGame
                  </span>
                </div>
                <DrawerClose className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors">
                  <X size={20} />
                </DrawerClose>
              </div>

              <div className="flex-1 overflow-y-auto px-4">
                <motion.div
                  initial="closed"
                  animate="open"
                  variants={itemVariants}
                  className={`mb-4 bg-muted/80 p-4 rounded-lg border border-border shadow-md ${
                    isGuest ? "opacity-75" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative">
                      <div
                        className={`absolute -inset-1 ${
                          isGuest ? "bg-gray-500/20" : "bg-accent/20"
                        } rounded-full blur-sm`}
                      ></div>
                      <div
                        className={`relative flex items-center justify-center w-10 h-10 ${
                          isGuest ? "bg-gray-500/20" : "bg-accent/20"
                        } rounded-full`}
                      >
                        <User
                          size={20}
                          className={isGuest ? "text-gray-400" : "text-accent"}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-foreground">
                        {displayName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {isGuest ? "Not logged in" : "Logged in"}
                      </span>
                    </div>
                  </div>

                  {displayEmail && (
                    <div className="bg-background/60 p-2 rounded-md">
                      <span className="text-sm text-muted-foreground">
                        Email
                      </span>
                      <div className="text-sm font-medium text-foreground truncate">
                        {displayEmail}
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* {currentUser?.role === "ADMIN" && (
                  <Link to="/admin-dashboard" className="block mt-3 mb-1">
                    <div className="flex items-center gap-2 p-2 rounded-md bg-gradient-to-r from-primary/10 to-accent/10 border border-border hover:bg-muted/80 transition-all cursor-pointer">
                      <ShieldCheck
                        size={16}
                        strokeWidth={2}
                        className="text-primary"
                      />
                      <span className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Admin Dashboard
                      </span>
                    </div>
                  </Link>
                )} */}

                <div className="h-px w-full bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 my-6"></div>

                <nav className="space-y-1 pb-6">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial="closed"
                      animate="open"
                      variants={itemVariants}
                      custom={index}
                    >
                      <DrawerClose asChild>
                        <div className="py-1 px-2 text-sm rounded-lg hover:bg-muted/60 transition-colors">
                          <NavbarItem item={item} isMobile />
                        </div>
                      </DrawerClose>
                    </motion.div>
                  ))}
                </nav>

                <div className="border-t border-border/30 bg-background/80 p-4">
                  <motion.div
                    initial="closed"
                    animate="open"
                    variants={itemVariants}
                  >
                    <AuthButtons isMobile />
                  </motion.div>
                </div>
              </div>
            </div>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </div>
  );
};

export default MobileMenu;
