import { Link } from "react-router-dom";
import { useAllFacilityQuery } from "../../../Redux/features/FacilityManagement/FacilityManagement";
import { TFacility } from "../../../Types/TFacility";
import { CiLocationOn } from "react-icons/ci";
import { FaMoneyBill1Wave } from "react-icons/fa6";
const CheapestFacilityForYou = () => {
  const { data, isLoading } = useAllFacilityQuery({ limit: 5 });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-dots loading-md"></span>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg p-4 pb-[2px]">
      <h1 className="text-xl font-semibold mb-2">Cheapest Facility For you:</h1>
      <div>
        {data?.data?.map((facility: TFacility) => (
          <div key={facility._id} className="flex items-center justify-between gap-x-2 mb-2 bg-slate-100 p-1 rounded-lg">
            <div className="flex items-center gap-x-2">
              <img
                className="w-28 h-20 rounded-md"
                src={facility.image}
                alt=""
              />
              <div className="space-y-1">
                <p className="font-semibold text-lg">
                  {facility.name.length > 25
                    ? facility.name.slice(0, 25)
                    : facility.name}
                  {facility.name.length > 25 ? "..." : ""}
                </p>
                <div className="flex items-center gap-x-1">
                  <CiLocationOn className="text-2xl text-red-500"></CiLocationOn>
                  <p className="font-medium">{facility.location}</p>
                </div>
                <div className="flex items-center gap-x-1">
                  <FaMoneyBill1Wave className="text-2xl text-blue-500"></FaMoneyBill1Wave>
                  <p className="font-medium">
                    <span className="text-lg font-bold text-green-600">
                      ${facility.pricePerHour}
                    </span>{" "}
                    / Per hour
                  </p>
                </div>
              </div>
            </div>
            <Link
              className="bg-[#3498DB] hover:bg-[#E67E22] text-white btn btn-sm"
              to={""}
            >
              Book now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheapestFacilityForYou;
