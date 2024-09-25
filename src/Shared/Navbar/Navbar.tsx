import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  logout,
  TUser,
  useCurrentToken,
} from "../../Redux/features/Auth/authSlice";
import { verifyToken } from "../../Utils/veryfyToken";
import { toast } from "sonner";
import { RootState } from "../../Redux/store";
import { useUserInfoQuery } from "../../Redux/features/Users/userManagementApi";

const Navbar = () => {
  const [hideNavbar, setHideNavbar] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector((state: RootState) => state.auth.user);
  const { data: userInfo, isLoading } = useUserInfoQuery(user?.email);

  let currentUser;
  const dispatch = useAppDispatch();

  if (token) {
    currentUser = verifyToken(token) as TUser;
  }

  const navElement = (
    <>
      <NavLink
        className="px-4 py-1 mr-2 rounded-sm text-[#34495E] hover:text-[#3498DB] font-bold font-[lato]"
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className="px-4 py-1 mr-2 rounded-sm text-[#34495E] hover:text-[#3498DB] font-bold font-[lato]"
        to="/shop"
      >
        Shop
      </NavLink>
      {currentUser?.email && (
        <NavLink
          className="px-4 py-1 mr-2 rounded-sm text-[#34495E] hover:text-[#3498DB] font-bold font-[lato]"
          to={`/${currentUser?.role}/dashboard/home`}
        >
          Dashboard
        </NavLink>
      )}
      <NavLink
        className="px-4 py-1 mr-2 rounded-sm text-[#34495E] hover:text-[#3498DB] font-bold font-[lato]"
        to="/about"
      >
        About us
      </NavLink>
    </>
  );

  window.addEventListener("scroll", function () {
    if (scrollValue < this.scrollY) {
      setHideNavbar(true);
    } else {
      setHideNavbar(false);
    }
    setScrollValue(this.scrollY);
  });

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Log out success");
  };

  return (
    <div
      className={`sticky top-0 z-10 transition duration-500 ${
        hideNavbar ? "translate-y-[-110px]" : "top-0 translate-y-0"
      }`}
    >
      <div className=" py-2 flex px-5 justify-between items-center bg-white/80 backdrop-blur-3xl">
        <div className="flex items-center">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navElement}
            </ul>
          </div>
          <div className="flex items-center gap-x-2">
            <img
              className="w-12 rotate-360"
              src="https://res.cloudinary.com/dmncfe9eh/image/upload/v1726666040/New_Project_11_nbylqf.png"
              alt=""
            />
            <p className="text-2xl font-bold">
              <span className="text-[#34495E]">Field</span> Time
            </p>
          </div>
        </div>
        <div className=" hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navElement}</ul>
        </div>
        <div className="flex items-center gap-x-4">
          {userInfo?.data?.profileImage && (
            <img
              className="w-10 rounded-full border"
              src={userInfo?.data?.profileImage}
              alt=""
            />
          )}
          {currentUser?.email ? (
            <button
              onClick={() => handleLogout()}
              className="btn btn-sm bg-[#3498DB] hover:bg-[#2e8dcc] border-none text-white"
            >
              Log out
            </button>
          ) : (
            <NavLink
              to="/login"
              className="btn btn-sm bg-[#3498DB] hover:bg-[#2e8dcc] border-none text-white"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
