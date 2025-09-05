import { Link } from "react-router-dom";
import ProfileInfoCard from "../card/ProfileInfoCard";

function NavBar() {
  return (
    <div className="h-16 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-2.5 px-4 md:px-3 md:py-3 sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between gap-5">
        <Link to="/dashboard">
          <h2 className="text-lg md:text-xl font-bold text-stone-800 leading-5">
            HirePath
          </h2>
        </Link>
        <div className="md:px-3">
          <ProfileInfoCard />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
