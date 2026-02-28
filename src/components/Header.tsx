import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Nav } from "./Nav";

export const Header = () => {
  const isAuth = useAuth();

  return (
    <header className="fixed top-2 left-1/2 -translate-x-1/2 w-[calc(100%-16px)] max-w-360 z-50 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg p-2 flex flex-col gap-2">
      <div className="flex flex-row items-center justify-between w-full">
        <Link to="/" className="text-2xl font-bold uppercase">
          Habitio
        </Link>
        {isAuth ? <Nav /> : <div className=""></div>}
      </div>
    </header>
  );
};
