import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NavbarItemType } from "../../types/navbar-types/navbarTypes";
import { cn } from "../../lib/utils";

interface NavbarItemProps {
  item: NavbarItemType;
  isMobile?: boolean;
  onClick?: () => void;
}

export const NavbarItem: React.FC<NavbarItemProps> = ({
  item,
  isMobile = false,
  onClick,
}) => {
  const location = useLocation();
  const isActive = location.pathname === item.href;

  return (
    <Link
      to={item.href}
      onClick={onClick}
      className={cn(
        "transition-colors duration-200 font-medium py-1 block",
        "hover:text-blue-600 focus:text-blue-600",
        isMobile ? "px-3 py-2" : "",
        isActive && !isMobile
          ? "text-blue-600 border-b-2 border-blue-600"
          : isActive && isMobile
          ? "text-blue-600 font-semibold bg-gray-100 rounded"
          : "text-gray-700 hover:text-blue-600"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {item.label}
    </Link>
  );
};
