import { useState } from "react";
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
  useRegisterUserMutation,
} from "../../../Redux/features/Users/userManagementApi";
import { TUserWithId } from "../../../Utils/TAdmin";
import { toast } from "sonner";
import { hostSingleImage } from "../../../Utils/ImageUpload";
import axios from "axios";
import Swal from "sweetalert2";

const Admin = () => {
  const { data, isLoading } = useGetAllUserQuery({ role :"admin"});
  const [loading, setLoading] = useState(false);
  const [createNewUser] = useRegisterUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleCreteAdmin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const name = target.userName.value;
    const email = target.email.value;
    const password = target.password.value;
    const confirmPassword = target.confirmPassword.value;
    const phone = target.phone.value;
    const address = target.address.value;
    const profileImageFile = target.profileImage.files;

    if (password.length < 8) {
      return toast.error("Please Provide minimum 8 character password!");
    }

    if (password !== confirmPassword) {
      return toast.error("Password dose not match!");
    }

    // checking user exist or not
    setLoading(true);
    const res = await axios.get(
      `https://assignment-three-sable.vercel.app/api/auth/isExistUser/${email}`
    );
    const toastId = toast.loading("Register in");
    if (res?.data?.data?._id) {
      setLoading(false);
      target.reset()
      return toast.error("This user is already exist", {
        id: toastId,
        duration: 2000,
      });
    }

    let profileImage;
    // upload profile image in cloudinary
    if (profileImageFile.length > 0) {
      const res = await hostSingleImage(profileImageFile);
      profileImage = res[0];
    }

    const userData = {
      name,
      email,
      password,
      confirmPassword,
      phone,
      role: "admin",
      address,
      profileImage,
    };

    try {
      const response = await createNewUser(userData);
      if (response?.data?.data?._id) {
        setLoading(false);
        (
          document.getElementById("modalForAddBooking") as HTMLDialogElement
        ).close();
        toast.success("Admin create successfully", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("something went wrong!", { id: toastId, duration: 2000 });
    }
  };

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
          Admin Management
        </h1>
        <button
          onClick={() =>
            (
              document.getElementById("modalForAddBooking") as HTMLDialogElement
            ).showModal()
          }
          className="font-medium text-white bg-blue-500 hover:bg-blue-600 btn rounded-md"
        >
          Add Admin
        </button>
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
            {data?.data?.map((admin: TUserWithId) => (
              <tr key={admin._id} className=" border border-slate-300 rounded-lg mt-[-20]">
                <td className="min-w-[250px]">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={admin.profileImage}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{admin.name}</div>
                      <p>
                        <span className="font-bold">Phone : {admin.phone}</span>
                      </p>
                    </div>
                  </div>
                </td>
                <td className="min-w-[350px]">
                  <p>
                    Address : <span className="font-bold">{admin.address}</span>
                  </p>
                  <p>
                    Email : <span className="font-bold">{admin.email}</span>
                  </p>

                  <p>
                    Role : <span className="font-bold">{admin.role}</span>
                  </p>
                </td>
                <th>
                  {data?.data?.length === 1 ? (
                    <button
                      disabled
                      className="btn bg-red-500 hover:bg-red-600 text-white"
                    >
                      Delete
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDelete(admin._id)}
                      className="btn bg-red-500 hover:bg-red-600 text-white"
                    >
                      Delete
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <dialog
        id="modalForAddBooking"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className="relative">
            <form onSubmit={handleCreteAdmin} action="">
              <label htmlFor="nameId">Name</label>
              <input
                required
                type="text"
                name="userName"
                id="nameId"
                className="px-4 w-full mt-1 mb-3 outline-none py-2 border-2 focus:border-blue-400 rounded-lg text-slate-500"
                placeholder="Enter Your Name"
              />
              <label htmlFor="email">Email</label>
              <input
                required
                type="email"
                name="email"
                id="email"
                className="px-4 w-full mt-1 mb-3 outline-none py-2 border-2 focus:border-blue-400 rounded-lg text-slate-500"
                placeholder="Enter Your Email"
              />
              <label htmlFor="password">Password</label>
              <input
                required
                type="password"
                name="password"
                id="password"
                className="px-4 w-full mt-1 mb-3 outline-none py-2 border-2 focus:border-blue-400 rounded-lg text-slate-500"
                placeholder="Enter Your Password"
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                required
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="px-4 w-full mt-1 mb-3 outline-none py-2 border-2 focus:border-blue-400 rounded-lg text-slate-500"
                placeholder="Confirm Your Password"
              />
              <label htmlFor="phone">Phone</label>
              <input
                required
                type="text"
                name="phone"
                id="phone"
                className="px-4 w-full mt-1 mb-3 outline-none py-2 border-2 focus:border-blue-400 rounded-lg text-slate-500"
                placeholder="Enter Your Number"
              />
              <label htmlFor="profile">
                Profile Image <br />
              </label>
              <input
                required
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                name="profileImage"
                className="file-input text-black mt-1 mb-3 file-input-bordered w-full "
              />
              <label htmlFor="address">Address</label>
              <textarea
                required
                name="address"
                id="address"
                rows={2}
                className="px-4 w-full mt-1 mb-3 outline-none py-2 border-2 focus:border-blue-400 rounded-lg text-slate-500"
                placeholder="Enter Your Address"
              ></textarea>
              {loading ? (
                <div className="bg-[#3498DB] w-20 text-white py-2 flex justify-center px-4 rounded-lg hover:bg-[#2980B9]">
                  <span className="cursor-wait loading loading-spinner loading-md"></span>
                </div>
              ) : (
                <input
                  className=" cursor-pointer bg-[#3498DB] text-white py-2 px-4 rounded-lg hover:bg-[#2980B9]"
                  type="submit"
                  name=""
                  id=""
                />
              )}
            </form>
            <button
              onClick={() => (
                (
                  document.getElementById(
                    "modalForAddBooking"
                  ) as HTMLDialogElement
                ).close(),
                setLoading(false)
              )}
              className=" absolute bottom-0 left-24 cursor-pointer text-white py-2 px-4 rounded-lg bg-red-500 hover:bg-red-600"
            >
              {" "}
              Close{" "}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Admin;
