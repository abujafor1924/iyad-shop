import Test from "../Error/Test";

import Catagorybar from "../Navbar/Catagorybar";
import Navbar from "../Navbar/Navbar";
import TopBar from "../Navbar/TopBar";

import MainBannar from "./Bannar/MainBannar";

import Footer from "./Footer/Footer";
import NewArible from "./caregorySection/NewArible";

const Home = () => {
  return (
    <div>
      <TopBar />
      <Navbar />
      <Catagorybar />
      <MainBannar />
      {/* <NewArible /> */}
      {/* <BestSell /> */}
      {/* <Tost /> */}
      <NewArible />
      <Test />
      {/* <AdBanner /> */}
      {/* <CategoryShow /> */}

      <Footer />
    </div>
  );
};

export default Home;
