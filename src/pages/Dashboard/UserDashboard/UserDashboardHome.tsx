import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";
import { FaBasketShopping } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { useAppSelector } from "../../../Redux/hooks";
import { TUser, useCurrentToken } from "../../../Redux/features/Auth/authSlice";
import { RootState } from "../../../Redux/store";
import { useUserInfoQuery } from "../../../Redux/features/Users/userManagementApi";
import { verifyToken } from "../../../Utils/veryfyToken";

const UserDashboardHome = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const token = useAppSelector(useCurrentToken);
  const verifyUser = verifyToken(token || '') as TUser;
  const { data: userInfo, isLoading } = useUserInfoQuery(verifyUser?.email, {skip : !token });
  
  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setIsExpanded(true);
  };

  const handleOutsideClick = () => {
    if (isDrawerOpen) {
      setIsDrawerOpen(false);
    }
  };

  const dashboardNavItem = [
    {
      path: "/user/dashboard/home",
      element: "Dashboard",
      icon: <MdDashboard></MdDashboard>,
    },
    {
      path: "/dashboard/product",
      element: "Product",
      icon: <FaBoxOpen></FaBoxOpen>,
    },
    {
      path: "/dashboard/order",
      element: "Order",
      icon: <FaBasketShopping></FaBasketShopping>,
    },
    {
      path: "/",
      element: "Home",
      icon: <FaHome></FaHome>,
    },
  ];

  return (
    <div className="max-w-7xl relative mx-auto  flex flex-col md:flex-col lg:flex-row">
      <div className=" block md:block lg:hidden" onClick={handleDrawerToggle}>
        <div className="flex mx-1 rounded-lg p-5 shadow-xl justify-between">
          <IoMenu className="text-2xl text-black " />
        </div>
      </div>

      {isDrawerOpen && (
        <div
          className=" inset-0 bg-black opacity-10 z-20"
          onClick={handleOutsideClick}
        ></div>
      )}

      <div
        className={`absolute top-0 left-0 h-screen lg:block bg-[#f1f2f7] text-black transition-all duration-300 ease-in-out transform ${
          isExpanded ? "w-48 block" : "w-16 hidden"
        } ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } z-30`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={` flex justify-center items-center mt-5  transition-all duration-300 ease-in-out transform`}>
          <img className={` rounded-full  ${isExpanded ? 'w-20 h-20' : "w-10 h-10"}`} src={userInfo?.data?.profileImage} alt="" />
        </div>
        <div className="mt-4 space-y-2">
          {dashboardNavItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={`flex gap-x-4 mb-4 ${
                isExpanded ? "justify-start" : "justify-center"
              } items-center hover:bg-[#707fdd] hover:text-white p-2 m-2 hover:rounded-md`}
            >
              <div className=" text-xl md:text-2xl lg:text-2xl">
                {item.icon}
              </div>
              <p
                className={`text-lg mt-1 transition-opacity duration-300 ease-in-out ${
                  isExpanded ? "block" : "hidden"
                }`}
              >
                {item.element}
              </p>
            </NavLink>
          ))}
        </div>
      </div>
     
      <div className="bg-slate-100 lg:ml-16 px-6 p-2 md:p-2 pt-5">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default UserDashboardHome;
