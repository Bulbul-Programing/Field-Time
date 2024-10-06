import { useParams } from "react-router-dom";
import { useFacilityDetailsQuery } from "../../Redux/features/FacilityManagement/FacilityManagement";
import { useEffect, useState } from "react";
import {
  useCheckAvailabilityQuery,
  useProcessToCheckoutMutation,
} from "../../Redux/features/BookingManagement/BookingManagement";
import { TAvailableSlots } from "../../Types/TAvailableSlots";
import { FaLocationDot } from "react-icons/fa6";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { toast } from "sonner";

const Booking = () => {
  const { id } = useParams();
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [updateStatus, setUpdateStatus] = useState(false);
  const { data, isLoading } = useFacilityDetailsQuery(id, { skip: !id });
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const [selectedDate, setSelectedDate] = useState(today);
  const { data: availableSlots } = useCheckAvailabilityQuery(
    { date: selectedDate, facility: id },
    { skip: !id && !selectedDate }
  );
  const [loading, setLoading] = useState(false);
  const facility = data?.data;
  const [processToCheckout] = useProcessToCheckoutMutation();

  useEffect(() => {
    if (date && startTime && endTime) {
      setUpdateStatus(true);
    }
  }, [date, startTime, endTime]);

  const handleDateChangeForFindSlot = (days: any) => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + days); // Add or subtract days
    setSelectedDate(currentDate.toISOString().split("T")[0]); // Update state with new date
  };

  const handleBookingCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const bookingInfo = {
      facility: id,
      date,
      startTime,
      endTime,
    };
    try {
      const res = await processToCheckout(bookingInfo);
      console.log(res);
      if (res?.error) {
        setLoading(false)
        return toast.error(`${(res.error as any).data.message}`);
      }
      window.location.replace(res?.data?.url)
    } catch (err: any) {
      console.log(err);
      // toast.error(`${err?.error?.data?.message}`);
    }

    // window.location.replace(res?.data?.url)
    // try {
    //   const res = await addBooking(bookingInfo);
    //   console.log(res);
    //   if (res?.data?.success) {
    //     toast.success(`Booking create successfully`);
    //     navigate("/facility");
    //     setStartTime("");
    //     setEndTime("");
    //     setDate("");
    //     handleModalClose();
    //   }

    //   if (res?.error) {
    //     toast.error(`${(res.error as any).data.message}`);
    //     setStartTime("");
    //     setEndTime("");
    //     setDate("");
    //   }
    // } catch (err: any) {
    //   console.log(err);
    //   setStartTime("");
    //   setEndTime("");
    //   setDate("");
    //   toast.error(`${err?.error?.data?.message}`);
    // }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (time: string, status: string) => {
    if (status === "startTime") {
      setStartTime(time);
    }
    if (status === "endTime") {
      setEndTime(time);
    }
  };

  const handleModalClose = () => {
    (document.getElementById("bookingModal") as HTMLDialogElement)!.close()!;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  return (
    <div>
      <div className="max-w-4xl mx-auto p-5 bg-white shadow-2xl rounded-3xl">
        <div className="flex flex-col md:flex-row lg:flex-row gap-y-3 gap-x-3 justify-between my-3">
          <div className=" w-full md:w-1/2 lg:w-1/2">
            <img
              className="w-full h-[250px] rounded-lg"
              src={facility?.image}
              alt=""
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/2">
            <h1 className="text-2xl font-bold mb-3">
              {facility?.name} Booking
            </h1>
            <p className="font-medium text-slate-500 mb-4">
              {facility?.description}
            </p>
            <div className="flex gap-x-2 items-center my-1">
              <FaLocationDot className="text-2xl text-red-500" />
              <p className="font-medium">{facility?.location}</p>
            </div>
            <div className="flex gap-x-2 items-center my-1">
              <FaMoneyBill1Wave className="text-2xl text-blue-500" />
              <p className="font-semibold text-blue-500 text-2xl flex items-center gap-x-1">
                ${facility?.pricePerHour}{" "}
                <span className="text-sm text-black">/ per hour</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center my-8 space-x-4">
          <input
            className="border border-gray-300 p-1 text-sm md:text-base lg:text-base rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={today}
          />

          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
            onClick={() => handleDateChangeForFindSlot(1)}
          >
            Next Day
          </button>
        </div>

        <div className="bg-gray-100 p-6 rounded-xl shadow-inner">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Available Time Slots
          </h2>
          {selectedDate ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-3">
              {availableSlots?.data?.map((slot: TAvailableSlots) => (
                <div
                  key={slot.startTime}
                  className={`flex justify-between items-center gap-x-5 bg-[#DBEAFE] rounded-lg px-5 py-3`}
                >
                  <div>
                    <p className="font-medium">Start Time</p>
                    <p className="text-lg font-semibold text-blue-500">
                      {slot.startTime}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">End Time</p>
                    <p className="text-lg font-semibold text-red-500">
                      {slot.endTime}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              Please select a date to see available slots.
            </p>
          )}
        </div>

        {selectedDate && (
          <div className="mt-8 text-center">
            <button
              onClick={() =>
                (document.getElementById(
                  "bookingModal"
                ) as HTMLDialogElement)!.showModal()
              }
              className="px-8 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 text-lg font-bold"
            >
              Confirm Booking
            </button>
          </div>
        )}
      </div>
      <dialog id="bookingModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div>
            <form onSubmit={handleBookingCheckout} className=" pt-5 w-full ">
              <label className="grid grid-cols-3 mb-3 justify-center gap-x-3 items-center">
                <label>
                  <label className="block text-gray-700 mb-2 text-xs md:text-sm lg:text-sm font-medium">
                    Select Date
                  </label>
                  <input
                    type="date"
                    min={today}
                    onChange={handleDateChange}
                    className="border border-gray-300 p-1 text-sm md:text-base lg:text-base w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Select Date"
                  />
                </label>

                <label>
                  <label
                    htmlFor="startTime"
                    className="block text-[12px] md:text-sm lg:text-sm text-gray-700 text-sm font-medium mb-2"
                  >
                    Select start Time
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    onChange={(e) =>
                      handleTimeChange(e.target.value, "startTime")
                    }
                    className="border w-full border-gray-300 p-1 text-sm md:text-base lg:text-base rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Select Start Time"
                    id="startTime"
                    step="60" // Allows selecting time with minute intervals
                  />
                </label>
                <label>
                  <label
                    htmlFor="endTime"
                    className="block text-[12px] md:text-sm lg:text-sm text-gray-700 text-sm font-medium mb-2"
                  >
                    Select end Time
                  </label>
                  <input
                    type="time"
                    placeholder="Select End time"
                    step="60"
                    className="border w-full border-gray-300 p-1 text-sm md:text-base lg:text-base rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="endTime"
                    id="endTime"
                    onChange={(e) =>
                      handleTimeChange(e.target.value, "endTime")
                    }
                  />
                </label>
              </label>

              <div className="flex items-center justify-end gap-x-2 mt-5">
                {updateStatus ? (
                  loading ? (
                    <span className="loading loading-dots loading-md"></span>
                  ) : (
                    <input
                      type="submit"
                      className="bg-[#3498DB] hover:bg-[#298cce] my-2 text-white btn "
                      value="Process to Checkout"
                    />
                  )
                ) : (
                  <input
                    disabled
                    className="text-black btn "
                    value="Process to Checkout"
                  />
                )}
                <input
                  onClick={handleModalClose}
                  className="btn w-20 bg-red-500 hover:bg-red-600 text-white"
                  value="close"
                />
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Booking;
