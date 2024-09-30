import React from 'react';
import { useAdminAllBookingQuery } from '../../../Redux/features/BookingManagement/BookingManagement';
import { TUpcomingBooking } from '../../../Types/TUpcomingBooking';
import { TBooking } from '../../../Types/TBooking';

const LatestBooking = () => {
    const { data } = useAdminAllBookingQuery({ sort: 'createdAt', limit: 3 })
    console.log(data);
    return (
        <div className='bg-white rounded-lg p-2'>
            <p className='text-lg font-bold mb-2'>Latest Booking : </p>
            {
                data?.data?.map((booking: TBooking) => (
                    <div className='flex gap-x-3 mb-2 w-full   rounded-lg'>
                        <img className='w-36 h-24 rounded-lg' src={booking.facility.image} alt="" />
                        <div>
                            <p className='text-lg font-medium'> {booking.facility.name}</p>
                            <p className='text-slate-600'>User name : {booking.user.name}</p>
                            <div className='flex gap-x-5 justify-end'>
                                <p className='text-slate-600'> Phone : {booking.user.phone}</p>
                                <p className='text-slate-600'> Date : <span className='font-bold'>{booking.date}</span></p>
                            </div>
                            <div className='flex gap-x-5 justify-between'>
                                <p className='text-slate-600'> Start Time : <span className='font-bold'>{booking.startTime}</span></p>
                                <p className='text-slate-600'> End time: <span className='font-bold'>{booking.endTime}</span></p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default LatestBooking;