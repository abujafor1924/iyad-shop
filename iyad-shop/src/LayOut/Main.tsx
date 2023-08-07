import { Outlet } from "react-router-dom";

import TopBar from "../page/Navbar/TopBar";

const Main = () => {
  return (
    <div>
      <TopBar />
      <Outlet />
    </div>
  );
};

export default Main;
