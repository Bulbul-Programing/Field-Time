import React, { useEffect, useState } from "react";
import {
  useUpdateBookingMutation,
  useUserAllBookingQuery,
} from "../../../Redux/features/BookingManagement/BookingManagement";
import { demoBookingData, TBookingModal } from "../../../Types/TBookingModal";
import { CiLocationOn } from "react-icons/ci";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import { RxCrossCircled } from "react-icons/rx";
import "react-datepicker/dist/react-datepicker.css";
import { getTodayDate } from "../../../Utils/getTodayDate";
import { toast } from "sonner";
import { MdPayment } from "react-icons/md";

const MyBooking = () => {
  const { data, isLoading } = useUserAllBookingQuery(undefined);
  const [selectBooking, setSelectBooking] =
    useState<TBookingModal>(demoBookingData);
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const today = getTodayDate();
  const [updateStatus, setUpdateStatus] = useState(false);
  const [updateBooking] = useUpdateBookingMutation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (date && startTime && endTime) {
      setUpdateStatus(true);
    }
  }, [date, startTime, endTime]);

  if (isLoading) {
    return (
      <div className="flex justify-center w-[1200px]">
        <span className="loading loading-dots loading-md"></span>
      </div>
    );
  }

  const handleUpdate = (id: string) => {
    const isExistBooking = data?.data?.find(
      (booking: TBookingModal) => booking._id === id
    );

    if (isExistBooking) {
      setSelectBooking(isExistBooking),
        (
          document.getElementById("modalForUpdateBooking") as HTMLDialogElement
        ).showModal();
    }
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
    (document.getElementById(
      "modalForUpdateBooking"
    ) as HTMLDialogElement)!.close()!;
  };

  const handleBookingUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    let updateInfo = {};

    if (date && startTime && endTime) {
      updateInfo = {
        facility: selectBooking.facility._id,
        _id: selectBooking._id,
        date,
        startTime,
        endTime,
        isBooked: e.currentTarget.status.value,
      };
    } else {
      updateInfo = {
        facility: selectBooking.facility._id,
        _id: selectBooking._id,
        isBooked: e.currentTarget.status.value,
      };
    }

    try {
      const res = await updateBooking(updateInfo);

      if (res?.data?.success) {
        toast.success(`Booking update successfully`);
        setStartTime("");
        setEndTime("");
        setDate("");
        setLoading(false);
        setUpdateStatus(false);
        handleModalClose();
      }

      if (res?.error) {
        toast.error(`${(res.error as any).data.message}`);
        setStartTime("");
        setEndTime("");
        setLoading(false);
        setUpdateStatus(false);
        setDate("");
      }
    } catch (err: any) {
      console.log(err);
      setStartTime("");
      setEndTime("");
      setDate("");
      setUpdateStatus(false);
      setLoading(false);
      toast.error(`${err?.error?.data?.message}`);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Booking info</th>
              <th>Facility Details</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((booking: TBookingModal, index: number) => (
              <tr key={booking._id} className="shadow-md mt-5">
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3 min-w-[400px]">
                    <div className="avatar">
                      <div className=" h-16 w-16 rounded-lg">
                        <img
                          src={booking.facility.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {booking.facility.name.length > 25
                          ? booking.facility.name.slice(0, 25)
                          : booking.facility.name}
                        {booking.facility.name.length > 25 ? "..." : ""}
                      </div>
                      {booking.facility.description.length > 80
                        ? booking.facility.description.slice(0, 80)
                        : booking.facility.description}
                      {booking.facility.description.length > 80 ? "..." : ""}
                      <div className="font-medium mt-1 text-slate-600 flex ml-[-5px] items-center">
                        <CiLocationOn className="text-red-500 text-xl" />
                        {booking.facility.location}
                      </div>
                    </div>
                  </div>
                </td>
                <td className=" min-w-[450px] border">
                  <div className="grid grid-cols-2 justify-between items-center">
                    <div className="flex items-center gap-x-1 mt-1 ml-1">
                      <FaMoneyBill1Wave className="text-xl text-blue-500"></FaMoneyBill1Wave>
                      <p className="font-medium">
                        <span className=" font-bold text-green-600">
                          ${booking.facility.pricePerHour}
                        </span>{" "}
                        / Per hour
                      </p>
                    </div>
                    <div className="flex items-center gap-x-1 mt-1 ml-1">
                      <FaCalendarAlt className="text-xl text-blue-500"></FaCalendarAlt>
                      <p className=" font-bold">{booking.date}</p>
                    </div>

                    <div className="flex items-center gap-x-1 mt-1">
                      <IoMdTime className="text-xl text-blue-500"></IoMdTime>
                      <p className="font-medium">
                        Start Time{" "}
                        <span className=" font-bold text-green-600">
                          {booking.startTime}
                        </span>{" "}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-1 mt-1">
                      <IoMdTime className="text-xl text-blue-500"></IoMdTime>
                      <p className="font-medium">
                        End Time{" "}
                        <span className="font-bold text-red-600">
                          {booking.endTime}
                        </span>{" "}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-1 mt-1">
                      {booking.isBooked === "confirmed" ? (
                        <GrStatusGood className="text-green-500 text-xl" />
                      ) : (
                        <RxCrossCircled className="text-red-500 text-xl" />
                      )}

                      <p className="font-medium">
                        Status{" "}
                        <span
                          className={` font-bold ${
                            booking.isBooked === "confirmed"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                           {booking.isBooked}
                        </span>{" "}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-1 mt-1">
                      {booking.paymentStatus === "paid" ? (
                        <MdPayment className="text-green-500 text-2xl" />
                      ) : (
                        <MdPayment className="text-red-500 text-2xl" />
                      )}

                      <p className="font-medium">
                        Status{" "}
                        <span
                          className={`text-lg font-bold ${
                            booking.paymentStatus === "paid"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {booking.paymentStatus}
                        </span>{" "}
                      </p>
                    </div>

                    <div className="flex items-center gap-x-1 mt-1 ml-1">
                      <FaMoneyBill1Wave className="text-xl text-blue-500"></FaMoneyBill1Wave>
                      <p className="font-medium">
                        <span className=" font-bold text-green-600">
                          ${booking.payableAmount}
                        </span>{" "}
                        Payable Amount
                      </p>
                    </div>
                  </div>
                </td>
                <th>
                  <button
                    onClick={() => handleUpdate(booking._id)}
                    className="btn bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Update
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <dialog
          id="modalForUpdateBooking"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <div>
              <div>
                <h1 className="text-xl font-bold mb-3 text-center">
                  Update Your Booking
                </h1>
                <div>
                  <img
                    className="h-[250px] w-full rounded-lg"
                    src={selectBooking?.facility.image}
                    alt=""
                  />
                  <h1 className="text-xl my-2 font-medium">
                    {selectBooking.facility.name}
                  </h1>
                  <p className="text-slate-700">
                    {selectBooking.facility.description}
                  </p>
                  <div className="grid grid-cols-2 justify-between items-center">
                    <div className="flex items-center gap-x-1 mt-1 ml-1">
                      <FaCalendarAlt className="text-2xl text-blue-500"></FaCalendarAlt>
                      <p className="text-lg font-bold">{selectBooking.date}</p>
                    </div>
                    <div className="flex items-center gap-x-1 mt-1">
                      {selectBooking.isBooked === "confirmed" ? (
                        <GrStatusGood className="text-green-500 text-2xl" />
                      ) : (
                        <RxCrossCircled className="text-red-500 text-2xl" />
                      )}

                      <p className="font-medium">
                        Status{" "}
                        <span
                          className={`text-lg font-bold ${
                            selectBooking.isBooked === "confirmed"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {selectBooking.isBooked}
                        </span>{" "}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-1 mt-3">
                      <IoMdTime className="text-2xl text-blue-500"></IoMdTime>
                      <p className="font-medium">
                        Start Time{" "}
                        <span className="text-lg font-bold text-green-600">
                          {selectBooking.startTime}
                        </span>{" "}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-1 mt-1">
                      <IoMdTime className="text-2xl text-blue-500"></IoMdTime>
                      <p className="font-medium">
                        End Time{" "}
                        <span className="text-lg font-bold text-red-600">
                          {selectBooking.endTime}
                        </span>{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleBookingUpdate}
                className=" mt-5 pt-5 w-full border-t border-black"
              >
                <label className="grid grid-cols-3 mb-3 justify-center gap-x-3 items-center">
                  <label>
                    <label className="block text-gray-700 mb-2 text-xs md:text-sm lg:text-sm font-medium">
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      min={today}
                      defaultValue={selectBooking.date}
                      onChange={handleDateChange}
                      className="border border-gray-300 p-1 text-sm md:text-base lg:text-base w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Select Date"
                    />
                  </label>

                  <label>
                    <label
                      htmlFor="startTime"
                      className="block text-xs md:text-sm lg:text-sm text-gray-700 font-medium mb-2"
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
                      className="block text-xs md:text-sm lg:text-sm text-gray-700 font-medium mb-2"
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
                <label htmlFor="status">Status</label>
                <select
                  onChange={() => setUpdateStatus(true)}
                  name="status"
                  id="status"
                  className="border border-gray-300 p-2 mt-1 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="canceled">Canceled</option>
                </select>
                <div className="flex items-center justify-end gap-x-2 mt-5">
                  {updateStatus ? (
                    loading ? (
                      <span className="loading loading-dots loading-md"></span>
                    ) : (
                      <input
                        type="submit"
                        className="bg-[#3498DB] hover:bg-[#298cce] my-2 text-white btn "
                        value="Update Booking"
                      />
                    )
                  ) : (
                    <input
                      disabled
                      className="text-black btn "
                      value="Update Booking"
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
    </div>
  );
};

export default MyBooking;
