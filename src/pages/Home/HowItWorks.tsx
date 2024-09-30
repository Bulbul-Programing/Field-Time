import React from "react";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";

// Step details with images
const steps = [
    {
        title: "Step 1: Register",
        description:
            "Start by creating an account. Click the 'Register' button, enter your name, email, and password. Once registered, you'll receive a confirmation email to verify your account, allowing you to access features like managing your bookings and viewing available facilities.",
        imageUrl:
            "https://res.cloudinary.com/depy0i4bl/image/upload/v1727616783/3301529_490542-PHBWI6-527_idfrvq.jpg",
    },
    {
        title: "Step 2: Select Facility",
        description:
            "Browse through our list of sports facilities using the search bar or filters based on location, type of sport, or amenities. Each facility listing includes key details like capacity and availability. Select a facility to view more info and ensure it's the right fit for you.",
        imageUrl:
            "https://res.cloudinary.com/depy0i4bl/image/upload/v1727616765/8351261_3885914_hqkoeu.jpg",
    },
    {
        title: "Step 3: Book Date",
        description:
            "After selecting a facility, choose the date and time for your booking. Our interactive calendar will show availability. Specify how long you need the facility, then proceed to review your booking details before moving forward.",
        imageUrl:
            "https://res.cloudinary.com/depy0i4bl/image/upload/v1727616777/8510626_3942992_ayh8yo.jpg",
    },
    {
        title: "Step 4: Confirm",
        description:
            "Review your chosen facility, booking date, and time. If everything looks good, click 'Confirm Booking' to finalize the reservation. You'll get a confirmation message and an email with your booking details, including any additional instructions for your visit.",
        imageUrl:
            "https://res.cloudinary.com/depy0i4bl/image/upload/v1727616755/8615166_3896211_m484e3.jpg",
    },
];

const HowItWorks: React.FC = () => {
    return (
        <div className="container mx-auto ">
            <h2 className="text-3xl font-bold text-center mb-8" style={{ color: "#3498DB" }}>
                How It Works
            </h2>
            <div className="space-y-5">
                <div className="mx-5 md:mx-10 lg:mx-10 flex justify-between items-center">
                    <div className="flex flex-col md:flex-row lg:flex-row justify-between  gap-5 bg-[#DBEAFE] p-5 rounded-lg md:w-10/12 lg:w-4/6">
                        <img className="w-full md:w-64 lg:w-64 rounded-lg" src={steps[0].imageUrl} alt="" />
                        <div>
                            <h1 className="text-2xl font-semibold mb-3 md:mb-3 lg:mb-5 ">{steps[0].title}</h1>
                            <p className=" md:text-sm lg:text-base font-medium text-slate-700">{steps[0].description}</p>
                        </div>
                    </div>
                    <div className="hidden md:block lg:block ">
                        <div className="flex justify-center mr-10 lg:mr-24">
                            <div className="w-1 h-32 border-l-2 border-dashed border-[#3498DB]">

                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-5 md:mx-10 lg:mx-10 flex flex-row-reverse justify-between items-center">
                    <div className="flex flex-col md:flex-row lg:flex-row justify-between  gap-5 bg-[#DBEAFE] p-5 rounded-lg md:w-10/12 lg:w-4/6">
                        <img className="w-full md:w-64 lg:w-64 rounded-lg" src={steps[1].imageUrl} alt="" />
                        <div>
                            <h1 className="text-2xl font-semibold mb-3 md:mb-3 lg:mb-5 ">{steps[1].title}</h1>
                            <p className=" md:text-sm lg:text-base font-medium text-slate-700">{steps[1].description}</p>
                        </div>
                    </div>
                    <div className="hidden md:block lg:block ">
                        <div className="flex justify-center ml-10 lg:ml-24">
                            <div className="w-1 h-32 border-l-2 border-dashed border-[#3498DB]">

                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-5 md:mx-10 lg:mx-10 flex justify-between items-center">
                    <div className="flex flex-col md:flex-row lg:flex-row justify-between  gap-5 bg-[#DBEAFE] p-5 rounded-lg md:w-10/12 lg:w-4/6">
                        <img className="w-full md:w-64 lg:w-64 rounded-lg" src={steps[2].imageUrl} alt="" />
                        <div>
                            <h1 className="text-2xl font-semibold mb-3 md:mb-3 lg:mb-5 ">{steps[2].title}</h1>
                            <p className=" md:text-sm lg:text-base font-medium text-slate-700">{steps[2].description}</p>
                        </div>
                    </div>
                    <div className="hidden md:block lg:block ">
                        <div className="flex justify-center mr-10 lg:mr-24">
                            <div className="w-1 h-32 border-l-2 border-dashed border-[#3498DB]">

                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-5 md:mx-10 lg:mx-10 flex flex-row-reverse justify-between items-center">
                    <div className="flex flex-col md:flex-row lg:flex-row justify-between  gap-5 bg-[#DBEAFE] p-5 rounded-lg md:w-10/12 lg:w-4/6">
                        <img className="w-full md:w-64 lg:w-64 rounded-lg" src={steps[3].imageUrl} alt="" />
                        <div>
                            <h1 className="text-2xl font-semibold mb-3 md:mb-3 lg:mb-5 ">{steps[3].title}</h1>
                            <p className=" md:text-sm lg:text-base font-medium text-slate-700">{steps[3].description}</p>
                        </div>
                    </div>
                    <div className="hidden md:block lg:block ">
                        <div className="flex justify-center ml-10 lg:ml-24">
                            <div className="w-1 h-32 border-l-2 border-dashed border-[#3498DB]">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
