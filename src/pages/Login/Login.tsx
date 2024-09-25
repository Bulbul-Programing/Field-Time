/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { useSelector } from "react-redux";
import { setUser } from "../../Redux/features/Auth/authSlice";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../Redux/features/Users/userManagementApi";
import { toast } from "sonner";
import { verifyToken } from "../../Utils/veryfyToken";

const Login = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch();
  const [loginUser] = useLoginUserMutation()
  const navigate = useNavigate()

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading('Logging in');
    const target = e.currentTarget
    const email = target.email.value
    const password = target.password.value
    const userInfo = {
      email,
      password
    }
    
    try{
      const res = await loginUser(userInfo).unwrap()
      
      const verifyUser = verifyToken(res?.token)
      dispatch(setUser({user : verifyUser, token : res?.token}))
      navigate('/')
      toast.success('User Login successfully', {id : toastId, duration : 2000})
    }
    catch(err : any){
      console.log(err);
      toast.error(err.data.message, {id : toastId, duration : 2000})
    }
  };

  const handleGoogleLogin = () => {
    // Trigger Google login logic here
    console.log("Google Login Triggered");
  };

  return (
    <div className=" bg-center bg-cover bg-[url('https://res.cloudinary.com/depy0i4bl/image/upload/v1727099505/mitch-rosen-g9SNY0aLMF0-unsplash_1_1_qigu2z.jpg')]">
      <div className="bg-black/60 w-full flex items-center justify-center h-screen">
        <div className="backdrop-blur-lg border border-white bg-blue-500 bg-opacity-10 text-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-semibold mb-2 text-center text-[#ffffff]">
            Login
          </h2>

          <form onSubmit={handleSubmit} action="">
            <label htmlFor="email">Your Email</label>
            <input required type="email" name="email" id="email" className="px-4 w-full mt-1 mb-3 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" placeholder="Enter Your Email" />
            <label htmlFor="password">Your Password</label>
            <input required type="password" name="password" id="password" className="px-4 w-full mt-1 mb-3 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" placeholder="Enter Your Password" />
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
            <Link to="/register" className="text-[#3498DB] hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
