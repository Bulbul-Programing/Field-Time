import { useState } from "react";
import { useUserAllBookingQuery } from "../../Redux/features/BookingManagement/BookingManagement";
import { toast } from "sonner";
import { TUpcomingBooking } from "../../Types/TUpcomingBooking";
import { demoBookingData, TBookingModal } from "../../Types/TBookingModal";
import { CiLocationOn } from "react-icons/ci";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { GrStatusGood } from "react-icons/gr";
import { RxCrossCircled } from "react-icons/rx";


type TBooking = {
  date: string;
  startTime: string;
  endTime: string;
  facility: string;
  isBooked: string;
  payableAmount: number;
  user: {
    address: string;
    email: string;
    name: string;
    phone: string;
    profileImage: string;
    role: string;
    _id: string;
  };
};

const Calendar = () => {
  const { data } = useUserAllBookingQuery(undefined);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectBooking, setSelectBooking] = useState<TBookingModal>(demoBookingData)


  // Handle date selection
  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    const bookingForDate = data?.data?.find(
      (booking: TBooking) =>
        new Date(booking.date).toDateString() === date.toDateString()
    );

    if (bookingForDate) {
      setSelectBooking(bookingForDate),
        (document.getElementById(
          "bookingDetailsModal"
        ) as HTMLDialogElement)!.showModal()!;

    } else {
      toast(`No bookings on this date: ${date.toDateString()}`);
    }
  };

  // Check if the day is booked
  const isBooked = (date: Date): boolean => {
    return data?.data?.some(
      (booking: TBooking) =>
        new Date(booking.date).toDateString() === date.toDateString()
    );
  };

  // Function to get the total number of days in the current month
  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get the weekday for the first day of the month
  const getFirstDayOfMonth = (month: number, year: number): number => {
    return new Date(year, month, 1).getDay();
  };


  // Function to render the days of the current month
  const renderDays = () => {
    const days = [];
    const totalDays = getDaysInMonth(currentMonth, currentYear);
    const today = new Date();
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-12 h-12"></div>);
    }

    for (let i = 1; i <= totalDays; i++) {
      const day = new Date(currentYear, currentMonth, i);

      // Check if the date is past, present, or future
      const isPast = day < today;
      const isFuture = day > today;
      const isToday = day.toDateString() === today.toDateString();

      days.push(
        <div
          key={i}
          className={` w-8 md:w-12 lg:w-12 h-8 md:h-12 lg:h-12 flex items-center justify-center rounded-lg shadow-md m-1 transition-all
          ${isBooked(day) && isPast
              ? "bg-gradient-to-r from-red-500 to-red-700 text-white"
              : ""
            }
          ${isBooked(day) && isFuture
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
              : ""
            }
          ${isToday ? "bg-green-500 text-white" : ""}
          ${selectedDate && selectedDate.getDate() === i
              ? "border-2 border-blue-500"
              : ""
            }
          hover:bg-blue-100 hover:shadow-lg cursor-pointer`}
          onClick={() => handleDayClick(day)}
        >
          <span className="font-medium">{i}</span>
        </div>
      );
    }
    return days;
  };

  // Handle next month
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Handle previous month
  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleModalClose = () => {
    (document.getElementById(
      "bookingDetailsModal"
    ) as HTMLDialogElement)!.close()!;
  };

  console.log(selectBooking);

  return (
    <div className="bg-white p-2 md:p-4 lg:p-4 rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Bookings</h2>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePreviousMonth}
          className=" px-1 md:px-4 lg:px-4 py-2 text-xs md:text-base lg:text-base bg-gray-600 text-white rounded-md hover:bg-gray-800"
        >
          Previous Month
        </button>
        <h3 className=" text-base md:text-xl lg:text-xl font-semibold">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <button
          onClick={handleNextMonth}
          className="px-1 md:px-4 lg:px-4 py-2 text-xs md:text-base lg:text-base bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Next Month
        </button>
      </div>

      <div className="bg-white p-3 md:p-6 lg:p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-7 gap-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
            <div key={dayName} className="font-bold ml-3 text-gray-600">
              {dayName}
            </div>
          ))}
          {renderDays()}
        </div>
      </div>

      <dialog
        id="bookingDetailsModal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div>
            <h1 className="text-xl font-bold text-center">Your booking information</h1>
            <div>
              <img className="h-[250px] w-full rounded-lg" src={selectBooking?.facility.image} alt="" />
              <h1 className="text-xl my-2 font-medium">{selectBooking.facility.name}</h1>
              <p className="text-slate-700">{selectBooking.facility.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-x-1 mt-3">
                    <CiLocationOn className="text-2xl text-red-500"></CiLocationOn>
                    <p className="font-medium">{selectBooking.facility.location}</p>
                  </div>
                  <div className="flex items-center gap-x-1 mt-1 ml-1">
                    <FaMoneyBill1Wave className="text-2xl text-blue-500"></FaMoneyBill1Wave>
                    <p className="font-medium">
                      <span className="text-lg font-bold text-green-600">
                        ${selectBooking.facility.pricePerHour}
                      </span>{" "}
                      / Per hour
                    </p>
                  </div>
                  <div className="flex items-center gap-x-1 mt-1 ml-1">
                    <FaCalendarAlt className="text-2xl text-blue-500"></FaCalendarAlt>
                    <p className="text-lg font-bold">{selectBooking.date}</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-x-1 mt-3">
                    <IoMdTime className="text-2xl text-blue-500"></IoMdTime>
                    <p className="font-medium">
                      Start Time {' '}
                      <span className="text-lg font-bold text-green-600">
                        {selectBooking.startTime}
                      </span>{" "}
                    </p>
                  </div>
                  <div className="flex items-center gap-x-1 mt-1">
                    <IoMdTime className="text-2xl text-blue-500"></IoMdTime>
                    <p className="font-medium">
                      End Time {' '}
                      <span className="text-lg font-bold text-red-600">
                        {selectBooking.endTime}
                      </span>{" "}
                    </p>
                  </div>
                  <div className="flex items-center gap-x-1 mt-1">
                    {
                      selectBooking.isBooked === 'confirmed' ? <GrStatusGood className="text-green-500 text-2xl" /> : <RxCrossCircled className="text-red-500 text-2xl" />
                    }
                    
                    <p className="font-medium">
                     Status {' '}
                      <span className={`text-lg font-bold ${selectBooking.isBooked === 'confirmed' ? 'text-green-500' : 'text-red-500'}`}>
                        {selectBooking.isBooked}
                      </span>{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="btn mt-4 bg-red-400 hover:bg-red-500 text-white" onClick={handleModalClose}>
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default Calendar;
