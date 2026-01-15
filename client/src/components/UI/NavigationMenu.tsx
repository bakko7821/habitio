import { NavLink } from "react-router-dom";
import { CrossIcon } from "../../assets/icons";
import { textColor } from "../../utils/types/variables";

interface NavigationMenuProps {
  onClose: () => void;
}

export const NavigationMenu = ({ onClose }: NavigationMenuProps) => {
  return (
    <div
      className="fixed inset-0 z-50"
      onClick={onClose}
    >
      <nav
        className="flex flex-col items-start gap-3 z-50 top-0 right-0 fixed bg-white/30 backdrop-blur-md p-4 shadow-lg h-screen w-[40vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <NavLink to={"/habits"}>Habits</NavLink>
        <NavLink to={"/todo"}>Todo</NavLink>
        <NavLink to={"/kanban"}>Kanban</NavLink>
        <NavLink to={"/matrix"}>Eisenhower Matrix</NavLink>
        <button className="absolute right-4 top-4" onClick={onClose}><CrossIcon color={textColor} /></button>
      </nav>
    </div>
  );
};
