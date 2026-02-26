import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-red-500 w-full h-12 flex p-3 flex-row items-center justify-between">
      <div className="">
        <img src="" alt="logo" />
      </div>
      <nav className="flex flex-row gap-2 items-center justify-center">
        <Link to="/" className="text-base font-medium">
          Home
        </Link>
        <Link to="/profile" className="text-base font-medium">
          Profile
        </Link>
      </nav>
    </header>
  );
};
