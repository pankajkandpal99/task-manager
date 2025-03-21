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
        <Link to="/login" className="w-full">
          <Button
            variant="outline"
            className={`cursor-pointer ${isMobile ? "w-full" : ""}`}
          >
            Sign In
          </Button>
        </Link>
      )}
    </div>
  );
};

export default AuthButtons;
