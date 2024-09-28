import React, { useState } from 'react';
import { useUserAllBookingQuery } from '../../../Redux/features/BookingManagement/BookingManagement';
import { TBookingModal } from '../../../Types/TBookingModal';
import { CiLocationOn } from 'react-icons/ci';
import { FaMoneyBill1Wave } from 'react-icons/fa6';
import { IoMdTime } from 'react-icons/io';
import { FaCalendarAlt } from 'react-icons/fa';
import { GrStatusGood } from 'react-icons/gr';
import { RxCrossCircled } from 'react-icons/rx';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns"

const MyBooking = () => {
    const { data, isLoading } = useUserAllBookingQuery(undefined)
    const [selectBooking, setSelectBooking] = useState<TBookingModal>()
    const [date, setDate] = useState<string>("");
    const [time, setTime] = useState<string>("");

    if (isLoading) {
        return (
            <div className="flex justify-center w-[1200px]">
                <span className="loading loading-dots loading-md"></span>
            </div>
        );
    }

    const handleUpdate = (id: string) => {
        const isExistBooking = data?.data?.find(
            (booking: TBookingModal) =>
                booking._id === id
        );

        if (isExistBooking) {
            setSelectBooking(isExistBooking),
                (document.getElementById('my_modal_5') as HTMLDialogElement).showModal()
        }
    }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };


    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                            </th>
                            <th>Booking info</th>
                            <th>Facility Details</th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.data?.map((booking: TBookingModal, index: number) => (
                                <tr className='shadow-md mt-5'>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3 min-w-[400px]">
                                            <div className="avatar">
                                                <div className=" h-16 w-16 rounded-lg">
                                                    <img
                                                        src={booking.facility.image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{booking.facility.name.length > 25 ? booking.facility.name.slice(0, 25) : booking.facility.name}{booking.facility.name.length > 25 ? '...' : ''}</div>
                                                {booking.facility.description.length > 80 ? booking.facility.description.slice(0, 80) : booking.facility.description}{booking.facility.description.length > 80 ? '...' : ''}
                                                <div className="font-medium mt-1 text-slate-600 flex ml-[-5px] items-center"><CiLocationOn className='text-red-500 text-xl' />{booking.facility.location}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' min-w-[450px] border'>
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
                                                    Start Time {' '}
                                                    <span className=" font-bold text-green-600">
                                                        {booking.startTime}
                                                    </span>{" "}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-x-1 mt-1">
                                                <IoMdTime className="text-xl text-blue-500"></IoMdTime>
                                                <p className="font-medium">
                                                    End Time {' '}
                                                    <span className="font-bold text-red-600">
                                                        {booking.endTime}
                                                    </span>{" "}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-x-1 mt-1">
                                                {
                                                    booking.isBooked === 'confirmed' ? <GrStatusGood className="text-green-500 text-xl" /> : <RxCrossCircled className="text-red-500 text-xl" />
                                                }

                                                <p className="font-medium">
                                                    Status {' '}
                                                    <span className={` font-bold ${booking.isBooked === 'confirmed' ? 'text-green-500' : 'text-red-500'}`}>
                                                        {booking.isBooked}
                                                    </span>{" "}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-x-1 mt-1 ml-1">
                                                <FaMoneyBill1Wave className="text-xl text-blue-500"></FaMoneyBill1Wave>
                                                <p className="font-medium">
                                                    <span className=" font-bold text-green-600">
                                                        ${booking.payableAmount}
                                                    </span>{" "} Payable Amount
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <th>
                                        <button onClick={() => handleUpdate(booking._id)} className="btn bg-blue-500 hover:bg-blue-600 text-white">Update</button>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <div>
                            <div className="flex flex-col gap-4 p-4 w-80">
                                <label className="block text-gray-700 font-bold mb-2">
                                    Select Date
                                </label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={handleDateChange}
                                    className="border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Select Date"
                                />

                                <label className="block text-gray-700 font-bold mb-2">
                                    Select Time
                                </label>
                                <input
                                    type="time"
                                    value={time}
                                    onChange={handleTimeChange}
                                    className="border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Select Time"
                                    step="60" // Allows selecting time with minute intervals
                                />

                                <div className="mt-4">
                                    <p className="text-gray-600">
                                        Selected Date: <strong>{date || "None"}</strong>
                                    </p>
                                    <p className="text-gray-600">
                                        Selected Time: <strong>{time || "None"}</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default MyBooking;