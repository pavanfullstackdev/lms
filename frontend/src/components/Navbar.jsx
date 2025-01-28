import { GraduationCap } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";

const Navbar = () => {
  const user = true;
  const role = "admin"; // Replace this with your role logic

  return (
    <nav className="h-16 bg-white dark:bg-[#0A0A0A] border-b dark:border-gray-800 border-gray-200 fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-4 md:px-8">
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-center bg-gradient-to-t from-orange-500 via-white to-green-500 p-4 rounded-full shadow-xl hover:scale-90 transition-all">
          <GraduationCap size={30} className="text-blue-600" />
        </div>

        <h1 className="font-[Dancing Script] text-4xl font-semibold text-gray-800 dark:text-white tracking-wider leading-snug hover:text-blue-500 transition-all">
          EduPlatform
        </h1>
      </div>

      {/* Action Section */}
      <div className="flex items-center space-x-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>My Learning</DropdownMenuItem>
                <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                {role === "admin" && (
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                )}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button size="sm" variant="default">
              Login
            </Button>
            <Button size="sm" variant="default">
              Signup
            </Button>
          </>
        )}
        <DarkMode />
      </div>
    </nav>
  );
};

export default Navbar;
