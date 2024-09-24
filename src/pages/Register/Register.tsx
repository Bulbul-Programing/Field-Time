import axios from "axios";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useLoginUserMutation, useRegisterUserMutation } from "../../Redux/features/Users/userManagementApi";
import { verifyToken } from "../../Utils/veryfyToken";
import { useAppDispatch } from "../../Redux/hooks";
import { setUser } from "../../Redux/features/Auth/authSlice";

const Register = () => {
  const [loading, setLoading] = useState(false)
  const [createNewUser, ] = useRegisterUserMutation()
  const [loginUser] = useLoginUserMutation()
  const dispatch = useAppDispatch()
  

  const handleSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.currentTarget
    const name = target.userName.value
    const email = target.email.value
    const password = target.password.value
    const confirmPassword = target.confirmPassword.value
    const phone = target.phone.value
    const address = target.address.value
    // checking user exist or not
    setLoading(true)
    const res = await axios.get(`http://localhost:5000/api/auth/signup/isExistUser/${email}`)
    setLoading(false)
    const toastId = toast.loading('Logging in');
    if(res?.data?.data?._id){
      return toast.error('This user is already exist', {id : toastId, duration : 2000})
    }

    const userData = {
      name,
      email,
      password,
      confirmPassword,
      phone,
      role : 'user',
      address
    }
    
   try{
    const response = await createNewUser(userData)
    if(response?.data?.data?._id){
      const loginData = {
        email,
        password
      }
      const res = await loginUser(loginData)
      const verifyUser = verifyToken(res?.data?.token)
      dispatch(setUser({verifyUser, token : res?.data?.token}))
      toast.success('User register successfully', {id : toastId, duration : 2000})
    }
   }
   catch(err){
    console.log(err);
    toast.error('something went wrong!', {id : toastId, duration : 2000})
   }
   

  }

  const handleGoogleLogin = () => {

  }

  return (
    <div className="bg-center bg-cover bg-[url('https://res.cloudinary.com/depy0i4bl/image/upload/v1727099505/mitch-rosen-g9SNY0aLMF0-unsplash_1_1_qigu2z.jpg')]">
      <div className="bg-black/60 w-full flex items-center justify-center h-screen">
        <div className="backdrop-blur-lg border border-white bg-blue-500 bg-opacity-10 text-white p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-2xl font-semibold mb-6 text-center text-[#ffffff]">
            Register
          </h1>
          <form onSubmit={handleSubmit} action="">
            <label htmlFor="nameId">Your Name</label>
            <input required type="text" name="userName" id="nameId" className="px-4 w-full mt-1 mb-3 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" placeholder="Enter Your Name" />
            <label htmlFor="email">Your Email</label>
            <input required type="email" name="email" id="email" className="px-4 w-full mt-1 mb-3 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" placeholder="Enter Your Email" />
            <label htmlFor="password">Your Password</label>
            <input required type="password" name="password" id="password" className="px-4 w-full mt-1 mb-3 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" placeholder="Enter Your Password" />
            <label htmlFor="confirmPassword">Confirm Your Password</label>
            <input required type="password" name="confirmPassword" id="confirmPassword" className="px-4 w-full mt-1 mb-3 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" placeholder="Confirm Your Password" />
            <label htmlFor="phone">Your Phone</label>
            <input required type="text" name="phone" id="phone" className="px-4 w-full mt-1 mb-3 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" placeholder="Enter Your Number" />
            <label htmlFor="address">Your Address</label>
            <textarea required name="address" id="address" rows={2} className="px-4 w-full mt-1 mb-3 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" placeholder="Enter Your Address"></textarea>

            {
              loading ? <div className="w-full flex justify-center cursor-pointer bg-[#3498DB] text-white py-2 px-4 rounded-lg hover:bg-[#2980B9] focus:ring-4 focus:ring-[#3498DB]"><span className="loading loading-spinner loading-md"></span></div> : <input className="w-full cursor-pointer bg-[#3498DB] text-white py-2 px-4 rounded-lg hover:bg-[#2980B9] focus:ring-4 focus:ring-[#3498DB]" type="submit" name="" id="" />
            }
          </form>
          <div className="mt-4 flex items-center justify-between">
            <div className="border-b border-gray-300 w-full"></div>
            <p className="px-2 text-sm text-white">OR</p>
            <div className="border-b border-gray-300 w-full"></div>
          </div>

          <div className="text-3xl text-[#3498DB] flex justify-center my-3">
            <button onClick={handleGoogleLogin} className="cursor-pointer">
              <FaGoogle />
            </button>
          </div>

          <p className="mt-4 text-center text-sm text-[#ffffff]">
            Don't have an account?{" "}
            <Link to="/login" className="text-[#3498DB] hover:underline">
              Please Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
