import { useUserAllBookingQuery } from "../../../Redux/features/BookingManagement/BookingManagement";

const UpcomingBooking = () => {
  const { data, isLoading } = useUserAllBookingQuery({upcomingBooking : 'true'});
  if(isLoading){
    return <div className="flex justify-center items-center"><span className="loading loading-dots loading-md"></span></div>
  }
  return (
    <div>
      <div className="overflow-x-auto bg-white p-2 rounded-lg overflow-y-auto">
        <h1 className="text-xl font-semibold my-3">Your Upcoming booking</h1>
        <table className="table table-zebra border">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingBooking;
