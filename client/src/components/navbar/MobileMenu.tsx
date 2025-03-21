import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { CompanyLogo } from "../logo/CompanyLogo";
import { Separator } from "../ui/separator";
import { NavbarItem } from "./NavbarItem";
import AuthButtons from "../auth/AuthButtons";
import { NavbarItemType } from "../../types/navbar-types/navbarTypes";

interface MobileMenuProps {
  items: NavbarItemType[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ items }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleMobileItemClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-72">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center justify-start gap-2"
              onClick={handleMobileItemClick}
            >
              <CompanyLogo
                src="/logo.webp"
                alt="MultyComm"
                size="sm"
                type="image"
              />
            </Link>
          </div>

          <Separator />

          {/* Mobile Nav Items */}
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <NavbarItem
                key={item.id}
                item={item}
                isMobile
                onClick={handleMobileItemClick}
              />
            ))}
          </div>

          <div className="lg:hidden w-full absolute bottom-3 left-0 px-4">
            <AuthButtons isMobile />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
