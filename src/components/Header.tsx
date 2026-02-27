import BurgerMenuIcon from "@/assets/icons/ui/MenuHamburger.svg?react";
import UserIcon from "@/assets/icons/ui/User.svg?react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isOpenDropDownModal, setIsOpenDropDownModal] = useState(false);

  return (
    <header className="fixed top-2 left-1/2 -translate-x-1/2 w-[calc(100%-16px)] max-w-360 z-50 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg p-2 flex flex-col gap-2">
      <div className="flex flex-row items-center justify-between w-full">
        <Link to="/" className="text-2xl font-bold uppercase">
          Habitio
        </Link>

        <button
          onClick={() => setIsOpenDropDownModal((prev) => !prev)}
          className="p-2 flex items-center justify-center"
        >
          <BurgerMenuIcon className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {isOpenDropDownModal && (
        <nav className="p-2 w-full flex flex-row items-center justify-end">
          <ul className="flex flex-row gap-3">
            <li>
              <Link
                to="/profile"
                className="flex flex-row items-center justify-center gap-2"
              >
                <UserIcon className="w-5 h-5" />
                <span className="text-base font-medium uppercase">Профиль</span>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
