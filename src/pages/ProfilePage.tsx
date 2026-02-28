import ChartLineSmoothIcon from "@/assets/icons/ui/ChartLineSmooth.svg?react";
import UserSolidIcon from "@/assets/icons/ui/UserSolid.svg?react";
import { NavLink } from "react-router-dom";

export default function ProfilePage() {
  return (
    <>
      <div className="flex flex-row w-full items-center justify-between">
        <h1 className="text-2xl font-bold text-black">Профиль пользователя</h1>
        <button className="p-3 px-6 cursor-pointer rounded-full bg-black text-white text-base font-medium">
          Выйти
        </button>
      </div>
      <div className="flex flex-row w-full items-center justify-start">
        <NavLink
          to="/profile/info"
          className="p-2 px-3 flex flex-row items-center justify-center gap-2"
        >
          <UserSolidIcon className="w-6 h-6 text-black" />
          <span className="text-base font-medium text-black">Аккаунт</span>
        </NavLink>
        <NavLink
          to="/profile/progress"
          className="p-2 px-3 flex flex-row items-center justify-center gap-2"
        >
          <ChartLineSmoothIcon className="w-6 h-6 text-black" />
          <span>Прогресс</span>
        </NavLink>
      </div>
    </>
  );
}
