import { useUserAllBookingQuery } from "../../../Redux/features/BookingManagement/BookingManagement";
import { TUpcomingBooking } from "../../../Types/TUpcomingBooking";

const UpcomingBooking = () => {
  const { data, isLoading } = useUserAllBookingQuery({ upcoming: "true" });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-dots loading-md"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto h-[250px] bg-white p-2 rounded-lg overflow-y-auto">
        <h1 className="text-xl font-semibold my-3">Your Upcoming booking</h1>
        <table className="table table-zebra border">
          {/* head */}
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Start time</th>
              <th>End time</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((booking : TUpcomingBooking) => (
              <tr key={booking._id}>
                <td className="text-xs font-medium">{booking.date}</td>
                <td>{booking.facility.name.length > 25 ? booking.facility.name.slice(0,25) : booking.facility.name}{booking.facility.name.length > 25 ? '...' : ''}</td>
                <td>{booking.startTime}</td>
                <td>{booking.endTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingBooking;
