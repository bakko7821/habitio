// import BurgerMenuIcon from "@/assets/icons/ui/MenuHamburger.svg?react";
import UserIcon from "@/assets/icons/ui/User.svg?react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="fixed top-2 left-1/2 -translate-x-1/2 w-[calc(100%-16px)] max-w-360 z-50 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg p-2 flex flex-row items-center justify-between">
      <Link to="/" className="text-2xl font-bold uppercase">
        Habitio
      </Link>
      <nav className="flex flex-row items-center justify-center gap-1">
        <Link
          to="/profile"
          className="w-11 h-11 p-2 rounded-full flex items-center justify-center border-2 box-border border-gray-500"
        >
          <UserIcon className="w-6 h-6 text-gray-500" />
        </Link>
      </nav>
    </header>
  );
};
