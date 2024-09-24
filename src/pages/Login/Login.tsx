/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { useSelector } from "react-redux";
import { setUser } from "../../Redux/features/Auth/authSlice";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const { error } = useSelector((state: any) => state.auth);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setUser({ email, password }));
  };

  const handleGoogleLogin = () => {
    // Trigger Google login logic here
    console.log("Google Login Triggered");
  };

  return (
    <div className=" bg-center bg-cover bg-[url('https://res.cloudinary.com/depy0i4bl/image/upload/v1727099505/mitch-rosen-g9SNY0aLMF0-unsplash_1_1_qigu2z.jpg')]">
      <div className="bg-black/60 w-full flex items-center justify-center h-screen">
        <div className="backdrop-blur-lg border border-white bg-blue-500 bg-opacity-10 text-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-semibold mb-6 text-center text-[#ffffff]">
            Login
          </h2>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#ffffff]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 w-full mt-2 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#ffffff]">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 w-full mt-2 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#3498DB] text-white py-2 px-4 rounded-lg hover:bg-[#2980B9] focus:ring-4 focus:ring-[#3498DB]"
            >
              Login
            </button>
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
