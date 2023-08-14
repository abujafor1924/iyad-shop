import Catagorybar from "../Navbar/Catagorybar";
import Navbar from "../Navbar/Navbar";

import MainBannar from "./Bannar/MainBannar";

import Footer from "./Footer/Footer";
import CategoryShow from "./caregorySection/CategoryShow";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Catagorybar />
      <MainBannar />
      {/* <NewArible /> */}
      {/* <BestSell /> */}

      {/* <Test /> */}
      {/* <AdBanner /> */}
      <CategoryShow />

      <Footer />
    </div>
  );
};

export default Home;
