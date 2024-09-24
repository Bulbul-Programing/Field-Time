/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { FaPlus } from "react-icons/fa";
import { FaPercentage } from "react-icons/fa";

const OurAchievement = () => {
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("animated-number");
      if (element && isElementInViewport(element)) {
        setStartCount(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isElementInViewport = (el : any) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  return (
    <div className='bg-cover rounded-lg m-5 md:m-10 lg:m-20 bg-center bg-fixed bg-[url("https://res.cloudinary.com/depy0i4bl/image/upload/v1726849340/image9259_mko2pl.jpg")]'>
      <div className=" p-5 md:p-10 lg:p-10 rounded-lg text-white bg-slate-800 bg-opacity-20">
        <div className=" grid grid-cols-2 gap-y-8 md:grid-cols-4 lg:grid-cols-4 justify-between lg:mx-20 lg:gap-x-10 text-center">
          <div
            id="animated-number"
            className="flex flex-col justify-center items-center"
          >
            {startCount && (
              <div className="flex gap-x-3 items-center">
                <CountUp
                  className="text-2xl md:text-3xl lg:text-4xl font-bold"
                  start={0}
                  end={15}
                  duration={2.5}
                  separator=","
                ></CountUp>
                <FaPlus />
              </div>
            )}
            <h1 className="text-base md:text-lg lg:text-lg font-medium mt-3">Year Experience</h1>
          </div>
          <div
            id="animated-number"
            className="flex flex-col justify-center items-center"
          >
            {startCount && (
              <div className="flex gap-x-3 items-center">
                <CountUp
                  className="text-2xl md:text-3xl lg:text-4xl font-bold"
                  start={0}
                  end={25}
                  duration={2.5}
                  separator=","
                ></CountUp>
                <FaPlus />
              </div>
            )}
            <h1 className="text-base md:text-lg lg:text-lg font-medium mt-3">Festal Field</h1>
          </div>
          <div
            id="animated-number"
            className="flex flex-col justify-center items-center"
          >
            {startCount && (
              <div className="flex gap-x-3 items-center">
                <CountUp
                  className="text-2xl md:text-3xl lg:text-4xl font-bold"
                  start={0}
                  end={99}
                  duration={2.5}
                  separator=","
                ></CountUp>
                <FaPercentage />
              </div>
            )}
            <h1 className="text-base md:text-lg lg:text-lg font-medium mt-3">Best Services</h1>
          </div>
          <div
            id="animated-number"
            className="flex flex-col justify-center items-center"
          >
            {startCount && (
              <div className="flex gap-x-3 items-center">
                <CountUp
                  className="text-2xl md:text-3xl lg:text-4xl font-bold"
                  start={0}
                  end={4.9}
                  duration={2.5}
                  separator=","
                ></CountUp>
              </div>
            )}
            <h1 className="text-base md:text-lg lg:text-lg font-medium mt-3">Client Satisfied</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurAchievement;
