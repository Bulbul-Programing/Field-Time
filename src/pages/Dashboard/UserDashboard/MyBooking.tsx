import React from 'react';
import { useUserAllBookingQuery } from '../../../Redux/features/BookingManagement/BookingManagement';
import { TBookingModal } from '../../../Types/TBookingModal';
import { CiLocationOn } from 'react-icons/ci';

const MyBooking = () => {
    const { data, isLoading } = useUserAllBookingQuery(undefined)

    if (isLoading) {
        return (
            <div className="flex justify-center items-center">
                <span className="loading loading-dots loading-md"></span>
            </div>
        );
    }
    console.log(data);
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
                            <th></th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.data?.map((booking : TBookingModal, index : number) => (
                                <tr>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={booking.facility.image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{booking.facility.name}</div>
                                                <div className="text-sm text-slate-600 flex items-center"><CiLocationOn className='text-red-500 text-xl' />{booking.facility.location}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        Zemlak, Daniel and Leannon
                                        <br />
                                        <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                    </td>
                                    <td>Purple</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">details</button>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBooking;