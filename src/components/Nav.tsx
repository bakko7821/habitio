import { NavLink } from "react-router-dom";
import ChartIcon from "@/assets/icons/ui/BarChartOutlined.svg?react";
import TickIcon from "@/assets/icons/ui/Tick.svg?react";
import UserIcon from "@/assets/icons/ui/User.svg?react";

export const Nav = () => {
  return (
    <nav className="p-2 w-full flex flex-row items-center justify-end">
      <ul className="flex flex-row gap-3 items-center justify-center">
        <li>
          <NavLink
            to="/habits"
            className={({ isActive }) =>
              `nav-link flex items-center gap-2 ${isActive ? "active" : ""}`
            }
          >
            <TickIcon className="w-4 h-4" />
            <span className="text-sm font-medium uppercase">Привычки</span>
          </NavLink>
        </li>
        <div className="w-0.5 h-6 bg-gray-500 rounded-full"></div>
        <li>
          <NavLink
            to="/chart"
            className={({ isActive }) =>
              `nav-link flex items-center gap-2 ${isActive ? "active" : ""}`
            }
          >
            <ChartIcon className="w-4 h-4" />
            <span className="text-sm font-medium uppercase">Статистика</span>
          </NavLink>
        </li>
        <div className="w-0.5 h-6 bg-gray-500 rounded-full"></div>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `nav-link flex items-center gap-2 ${isActive ? "active" : ""}`
            }
          >
            <UserIcon className="w-4 h-4" />
            <span className="text-sm font-medium uppercase">Профиль</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
