import {
  useDeleteUserMutation,
  useGetAllUserQuery,
} from "../../../Redux/features/Users/userManagementApi";
import { TUserWithId } from "../../../Utils/TAdmin";
import { toast } from "sonner";
import Swal from "sweetalert2";

const AllUsers = () => {
  const { data, isLoading } = useGetAllUserQuery({ role: "user" });
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteUser(id);
          if (res?.data?.success as any) {
            toast.success(`${res?.data?.massage}`);
          }
          if (res?.error) {
            (res.error as any).data.errorSources.map((err: any) =>
              toast.error(`${err.message}`)
            );
          }
        } catch (err: any) {
          console.log(err);
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center w-[1200px]">
        <span className="loading loading-dots loading-md"></span>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full px-4 py-2 md:py-5 lg:py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className=" text-xl md:text-3xl lg:text-4xl font-bold">
          User Management
        </h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="border border-slate-300">
              <th>Name</th>
              <th>Info</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((user: TUserWithId) => (
              <tr
                key={user._id}
                className=" border border-slate-300 rounded-lg mt-[-20]"
              >
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
                <th>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn bg-red-500 hover:bg-red-600 text-white"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
