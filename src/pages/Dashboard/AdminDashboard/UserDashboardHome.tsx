import {
  useGetAllUserQuery,
} from "../../../Redux/features/Users/userManagementApi";
import { TUserWithId } from "../../../Utils/TAdmin";

const UserDashboardHome = () => {
  const { data, isLoading } = useGetAllUserQuery({ role :"user", args : {limit : 2}})

  if (isLoading) {
    return (
      <div className="flex justify-center w-[1200px]">
        <span className="loading loading-dots loading-md"></span>
      </div>
    );
  }

  return (
    <div className="mx-auto bg-white rounded-lg my-5 w-full p-4 ">
      <h1 className="text-xl font-bold mb-3">Latest user :</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="border border-slate-300">
              <th>Name</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((user: TUserWithId) => (
              <tr key={user._id} className=" border border-slate-300 rounded-lg mt-[-20]">
                <td className="min-w-[250px]">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.profileImage}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <p>
                        <span className="font-bold">Phone : {user.phone}</span>
                      </p>
                    </div>
                  </div>
                </td>
                <td className="min-w-[350px]">
                  <p>
                    Address : <span className="font-bold">{user.address}</span>
                  </p>
                  <p>
                    Address : <span className="font-bold">{user.email}</span>
                  </p>
                  <p>
                    Role : <span className="font-bold">{user.role}</span>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboardHome;
