import Catagorybar from "../Navbar/Catagorybar";
import Navbar from "../Navbar/Navbar";

import MainBannar from "./Bannar/MainBannar";
import CtegoryCom from "./caregorySection/CtegoryCom";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Catagorybar />
      <MainBannar />
      <CtegoryCom />
    </div>
  );
};

export default Home;
