import { FaStar } from "react-icons/fa";
import { IoIosCheckbox } from "react-icons/io";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <div className="my-10 md:my-12 lg:my-20 mx-5 md:mx-10 lg:mx-10 gap-y-5 gap-x-5 md:gap-x-10 lg:gap-x-10 flex flex-col md:flex-row lg:flex-row justify-between items-center">
      <div className=" flex flex-col md:flex-col lg:flex-none gap-y-5 relative w-full md:w-1/2 lg:w-1/2 text-white">
        <img
          className="w-full md:w-full lg:w-3/4 rounded-md"
          src="https://res.cloudinary.com/depy0i4bl/image/upload/v1726838270/rect860_ajjjc3.jpg"
          alt=""
        />
        <div className="lg:absolute lg:top-44 lg:left-56 rounded-md bg-[#3498DB] p-5 w-full md:w-full lg:w-1/2 space-y-3">
          <div className="flex ">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <h1 className="text-sm">
            " Super easy to book a facility! The website is user-friendly and
            detailed. Highly recommend! "
          </h1>
          <div className="flex gap-x-3 items-center">
            <img
              className="w-10 rounded-full"
              src="https://res.cloudinary.com/depy0i4bl/image/upload/v1726838270/yh1_foma5p.jpg"
              alt=""
            />
            <h1>Mr. Proshanto Roy</h1>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/2">
        <p className="text-[#3498DB] text-lg font-medium">About us</p>
        <h1 className="text-2xl md:text-2xl lg:text-4xl my-3 md:my-3 lg:my-5 font-bold">
          It's Been 15 Years We Stood Up And Always Improved
        </h1>
        <p className="text-[#34495E] text-sm md:text-sm lg:text-base mt-3">
          For 15 years, we've been committed to providing excellent sports
          facilities. Constantly evolving and improving, we strive to ensure the
          best experience for all our customers, making us a trusted name in the
          community.
        </p>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <div className="flex items-center gap-x-2">
                <IoIosCheckbox className="text-2xl text-[#3498DB]" />
                <p className="font-medium">Good Commitment</p>
            </div>
            <div className="flex items-center gap-x-2">
                <IoIosCheckbox className="text-2xl text-[#3498DB]" />
                <p className="font-medium">Have 25 festal field</p>
            </div>
            <div className="flex items-center gap-x-2">
                <IoIosCheckbox className="text-2xl text-[#3498DB]" />
                <p className="font-medium">Free Support</p>
            </div>
            <div className="flex items-center gap-x-2">
                <IoIosCheckbox className="text-2xl text-[#3498DB]" />
                <p className="font-medium">Trusted User</p>
            </div>
            <div className="flex items-center gap-x-2">
                <IoIosCheckbox className="text-2xl text-[#3498DB]" />
                <p className="font-medium">Friendly Price</p>
            </div>
            <div className="flex items-center gap-x-2">
                <IoIosCheckbox className="text-2xl text-[#3498DB]" />
                <p className="font-medium">Cafes and restaurants</p>
            </div>
        </div>
        <Link to='/about' className="btn mt-3 bg-[#3498DB] hover:bg-[#E67E22] text-white font-medium">Read More</Link>
      </div>
    </div>
  );
};

export default About;
