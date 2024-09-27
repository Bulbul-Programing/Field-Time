import { useAppSelector } from "../../../Redux/hooks";
import { TUser, useCurrentToken } from "../../../Redux/features/Auth/authSlice";
import { verifyToken } from "../../../Utils/veryfyToken";
import { useUserInfoQuery } from "../../../Redux/features/Users/userManagementApi";
import { Link } from "react-router-dom";
import Calendar from "../../../components/Calender/Calendar";
import UpcomingBooking from "../UserDashboard/UpcomingBooking";

const DashboardHome = () => {
  const token = useAppSelector(useCurrentToken);
  const verifyUser = verifyToken(token || "") as TUser;
  const { data: userInfo, isLoading } = useUserInfoQuery(verifyUser?.email, {
    skip: !token,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-dots loading-md"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-col lg:flex-row justify-between items-center gap-x-4">
      <div className=" flex flex-col gap-y-5 w-full md:w-full lg:w-1/2">
        <div className="flex justify-center items-center border bg-white p-4 rounded-lg">
          <div className="w-1/2 space-y-3">
            <h1 className="text-2xl font-bold">
              Welcome back{" "}
              <span className="text-[#707fdd]">{userInfo?.data?.name}</span>{" "}
            </h1>
            <Link
              to="/facility"
              className="btn bg-[#3498DB] hover:bg-[#E67E22] text-white"
            >
              Book now
            </Link>
          </div>
          <img
            className="w-1/2"
            src="https://res.cloudinary.com/depy0i4bl/image/upload/v1727432520/removal.ai__c1f6d15a-120d-4f12-8318-6aec8ab0514e-8626785_3959915_f4cbhq.png"
            alt=""
          />
        </div>
        <div>
          <UpcomingBooking />
        </div>
      </div>
      <div className=" w-full md:w-full lg:w-1/2">
        <Calendar></Calendar>
      </div>
    </div>
  );
};

export default DashboardHome;
