import { Link } from "react-router-dom";
import { BsMoon, BsMoonFill } from "react-icons/bs";

const Navbar = function ({ isDark, setIsDark }) {
  return (
    <header className={`border-b-2 ${isDark ? "border-none" : "border-b-neutral-100"}`}>
      <nav className="w-11/12 mx-auto">
        <div className="flex justify-between items-center py-4">
          <Link to="/">
            <h2 className="font-bold text-2xl">Where in the world?</h2>
          </Link>
          <h3 className="font-semibold flex items-center gap-1 cursor-pointer" onClick={() => setIsDark(!isDark)}>
            {isDark ? <BsMoonFill /> : <BsMoon />}
            Dark mode
          </h3>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
