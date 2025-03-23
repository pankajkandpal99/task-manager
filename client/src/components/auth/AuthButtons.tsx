import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronDown, LogOutIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store.ts";
import { logout } from "../../features/auth/authSlice.ts";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface AuthButtonsProps {
  isMobile?: boolean;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ isMobile = false }) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);

  const defaultAvatar =
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex items-center gap-4">
      {user && token ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-auto p-0 hover:bg-transparent flex flex-row gap-x-1"
            >
              <Avatar>
                <AvatarImage src={defaultAvatar} alt={user.username} />
                <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
              </Avatar>
              <ChevronDown
                size={16}
                strokeWidth={2}
                className="ml-2 opacity-60"
              />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-48 mt-2" align="end">
            <DropdownMenuLabel className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                {user.username}
              </span>
              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOutIcon size={16} strokeWidth={2} className="opacity-60" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/login">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6FFFB4] to-[#3694FF] rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200" />
            <div className="relative bg-[#6FFFB4] text-[#0a101f] px-6 py-2 rounded-full font-semibold group-hover:bg-[#8FFFCC] transition-all cursor-pointer">
              Sign in
            </div>
          </motion.button>
        </Link>
      )}
    </div>
  );
};

export default AuthButtons;
