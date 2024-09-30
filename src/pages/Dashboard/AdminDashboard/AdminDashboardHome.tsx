import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { useAppSelector } from "../../../Redux/hooks";
import { TUser, useCurrentToken } from "../../../Redux/features/Auth/authSlice";
import { useUserInfoQuery } from "../../../Redux/features/Users/userManagementApi";
import { verifyToken } from "../../../Utils/veryfyToken";
import { FaCalendarCheck } from "react-icons/fa";

const AdminDashboardHome = () => {
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
      path: "/admin/dashboard/home",
      element: "Dashboard",
      icon: <MdDashboard></MdDashboard>,
    },
    {
      path : '/admin/dashboard/booking',
      element : 'Booking',
      icon : <FaCalendarCheck/>,
    }
  ];

  return (
    <div className="relative max-w-7xl mx-auto">
      <div className=" block md:block lg:hidden" onClick={handleDrawerToggle}>
        <div className="flex mx-1 rounded-lg p-5 shadow-xl justify-between">
          <IoMenu className="text-2xl text-black " />
        </div>
      </div>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black opacity-10 z-20"
          onClick={handleOutsideClick}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-screen bg-[#f1f2f7] text-black transition-all duration-300 ease-in-out transform ${
          isExpanded ? "w-48" : "w-16"
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
     
      <div className="bg-slate-100 p-2 md:p-2 lg:pl-20 pt-5">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
