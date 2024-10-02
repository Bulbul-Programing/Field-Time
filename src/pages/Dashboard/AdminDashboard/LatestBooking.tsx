import { FaCalendarAlt, FaPhone } from 'react-icons/fa';
import { useAdminAllBookingQuery } from '../../../Redux/features/BookingManagement/BookingManagement';
import { TBooking } from '../../../Types/TBooking';
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdTime } from 'react-icons/io';

const LatestBooking = () => {
    const { data, isLoading } = useAdminAllBookingQuery({ sort: 'createdAt', limit: 5 })

    if (isLoading) {
        return <div className="flex justify-center items-center">
            <span className="loading loading-dots loading-md"></span>
        </div>
    }

    return (
        <div className='bg-white rounded-lg p-2'>
            <p className='text-lg font-bold mb-2 '>Latest Booking : </p>
            <div className=' h-[250px] overflow-auto'>
                {
                    data?.data?.map((booking: TBooking) => (
                        <div key={booking._id} className='flex flex-col md:flex-row lg:flex-row  py-2 gap-x-3 mb-2 w-full rounded-lg shadow-md px-2'>
                            <img className=' w-full md:w-52 lg:w-36 mb-3 md:mb-0 lg:mb-0 max-h-[200px] rounded-lg' src={booking.facility.image} alt="" />
                            <div className='w-full pr-4'>
                                <p className='text-xl font-semibold'> {booking.facility.name}</p>
                                <p className='text-slate-600 font-semibold mb-1'>User name : {booking.user.name}</p>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-5 justify-between'>
                                    <p className='text-slate-600 flex items-center gap-x-1'> <FaPhoneAlt className='text-blue-500' /> <span className='font-bold'>{booking.user.phone}</span></p>
                                    <p className='text-slate-600 flex items-center gap-x-1'><FaCalendarAlt className="text-lg text-blue-500"></FaCalendarAlt> <span className='font-bold'>{booking.date}</span></p>
                                    <p className='text-slate-600 flex items-center gap-x-1'> <IoMdTime className="text-xl text-blue-500"></IoMdTime><span className='font-bold'> start: {booking.startTime}</span></p>
                                    <p className='text-slate-600 flex items-center gap-x-1'> <IoMdTime className="text-xl text-blue-500"></IoMdTime><span className='font-bold'>End Time:{booking.endTime}</span></p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default LatestBooking;