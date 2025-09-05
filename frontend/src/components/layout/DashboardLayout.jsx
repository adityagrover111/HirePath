import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import NavBar from "./NavBar";

function DashboardLayout({ children }) {
  const { user } = useContext(UserContext);
  return (
    <div>
      <NavBar />
      {user && <div>{children}</div>}
    </div>
  );
}

export default DashboardLayout;
