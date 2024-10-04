import { useAdminAllBookingQuery } from '../../../Redux/features/BookingManagement/BookingManagement';
import { TBooking } from '../../../Types/TBooking';

const AllBooking = () => {
    const { data , isLoading} = useAdminAllBookingQuery(undefined)
    if (isLoading) {
        return (
            <div className="flex justify-center items-center">
                <span className="loading loading-dots loading-md"></span>
            </div>
        );
    }
    return (
        <div>
            <button className='text-xl my-2 bg-white px-4 rounded-lg py-2 font-semibold '>Total Booking <span className='font-bold text-blue-500'>{data?.data?.length}</span></button>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="py-3 px-6 text-left"></th>
                                <th className="py-3 px-6 text-left">Facility</th>
                                <th className="py-3 px-6 text-left">User info</th>
                                <th className="py-3 px-6 text-left">Time Slot</th>
                                <th className="py-3 px-6 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.data?.map((booking: TBooking) => (
                                    <tr key={booking._id} className="border-b border-gray-200 hover:bg-gray-50 my-5">
                                        <td className="min-w-32"><img className='w-20 px-0 rounded-lg' src={booking.facility.image} alt="" /></td>
                                        <td className="min-w-52">
                                            <p >Name: <span className='font-semibold'>{booking.facility.name}</span> </p>
                                            <p >Location: <span className='font-semibold'>{booking.facility.location}</span> </p>
                                        </td>
                                        <td className='min-w-40'>
                                            <p >Name: <span className='font-semibold'>{booking.user.name}</span> </p>
                                            <p >Phone: <span className='font-semibold'>{booking.user.phone}</span> </p>
                                            <p >Email: <span className='font-semibold'>{booking.user.email}</span> </p>
                                        </td>
                                        <td className=" min-w-32">
                                            <p >Date: <span className='font-semibold'>{booking.date}</span> </p>
                                            <p >Time: <span className='font-semibold'>{booking.startTime} - {booking.endTime}</span> </p>
                                            <p >Payable Amount: <span className='font-semibold'>${booking.payableAmount}</span> </p>
                                        </td>
                                        <td className={`font-semibold ${booking.isBooked === 'confirmed' ? 'text-green-500' : 'text-red-500'}`}>
                                            {booking.isBooked}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllBooking;