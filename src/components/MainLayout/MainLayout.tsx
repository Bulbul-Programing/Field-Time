import { Outlet } from "react-router-dom";
import Navbar from "../../Shared/Navbar/Navbar";
import Footer from "../../Shared/Footer/Footer";
import { FaArrowUp } from "react-icons/fa";
import { useState } from "react";

const MainLayout = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  window.addEventListener("scroll", toggleVisible);
  console.log(visible);
  return (
    <div className="relative">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      <div
        className={` bottom-0 left-0 right-0 mx-auto w-10 h-10  z-10 transition duration-500 ${
          visible ? "translate-y-[-30px] md:translate-y-[-40px] lg:translate-y-[-50px] sticky" : " translate-y-2"
        }`}
      >
        <div className=" flex justify-center items-center mx-auto w-14 h-14 cursor-pointer text-white rounded-full bg-blue-500">
          <FaArrowUp onClick={scrollToTop} className={`text-2xl`} />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
