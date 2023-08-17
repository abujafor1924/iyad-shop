import Banner from "./Banner";
import BottomSite from "./BottomSite";
import Sidebanner from "./Sidebanner";

const MainBannar = () => {
  return (
    <div className="flex my-6">
      <div className="w-[62%] ml-10">
        <Banner />
      </div>

      <div className="w-[30%] ml-5">
        <Sidebanner />
        <BottomSite />
      </div>
    </div>
  );
};

export default MainBannar;
