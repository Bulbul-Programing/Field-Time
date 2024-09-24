import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
// import { bannerData } from "../../Utils/HeroSectionData";

const HeroSection = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div
            className={`flex bg-[url('https://res.cloudinary.com/depy0i4bl/image/upload/v1726751909/home-store-goalklub_rfnd5c.jpg')] flex-col-reverse md:flex-row lg:flex-row shadow-lg px-5 gap-y-5 md:px-10 lg:px-20 py-5 md:py-10 lg:py-20 justify-between items-center }`}
          >
            <div className=" w-full md:w-1/2 lg:w-1/2">
              <motion.div
                className="card"
                initial={{
                  opacity: 0,
                  // if odd index card,slide from right instead of left
                  y: -50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0, // Slide in to its original position
                  transition: {
                    duration: 1, // Animation duration
                  },
                }}
                viewport={{ once: false }}
              >
                <h1 className="text-3xl text-white md:text-3xl lg:text-5xl font-bold my-5">
                  Book Your Perfect Sports Facility Today
                </h1>
              </motion.div>
              <motion.div
                className="card"
                initial={{
                  opacity: 0,
                  // if odd index card,slide from right instead of left
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0, // Slide in to its original position
                  transition: {
                    duration: 0.7, // Animation duration
                  },
                }}
                viewport={{ once: false }}
              >
                {/* <p className="text-slate-500 mb-5">{item.description}</p> */}
              </motion.div>
              <Link
                to="/facility"
                className="btn border-none mt-5 bg-[#3498DB] hover:bg-[#E67E22] text-white ml-3"
              >
                Book Now
              </Link>
            </div>
            <div className="md:w-1/2 lg:w-1/2">
              <motion.div
                className="card"
                initial={{
                  opacity: 0,
                  // if odd index card,slide from right instead of left
                  x: 150,
                  y: 150,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: {
                    duration: 1, // Animation duration
                  },
                }}
                viewport={{ once: false }}
              >
                <div className="relative">
                  <img
                    className="drop-shadow-2xl rounded-md"
                    src="https://res.cloudinary.com/dmncfe9eh/image/upload/v1726673093/homelightslider2-Player-01_imcph9.png"
                  />
                  <motion.div
                    className="card"
                    initial={{
                      opacity: 0,
                      // if odd index card,slide from right instead of left
                      x: 450,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0, // Slide in to its original position
                      transition: {
                        duration: 1.5, // Animation duration
                      },
                    }}
                    viewport={{ once: false }}
                  >
                    <img
                      className="absolute top-[-180px] md:top-[-160px] lg:top-[-240px] left-10 w-2/6 md:w-2/6 lg:w-2/6"
                      src="https://res.cloudinary.com/depy0i4bl/image/upload/v1726751907/homelightslider2-Footbal_evb1zc.png"
                      alt=""
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className={`flex overflow-hidden justify-between bg-[url('https://res.cloudinary.com/depy0i4bl/image/upload/v1726751909/home-store-goalklub_rfnd5c.jpg')] flex-col md:flex-row lg:flex-row shadow-lg  items-center }`}
          >
            <div className=" px-5 gap-y-5 md:px-10 lg:px-20 py-5 md:py-10 lg:py-20 w-full md:w-1/2 lg:w-1/2">
              <motion.div
                className="card"
                initial={{
                  opacity: 0,
                  // if odd index card,slide from right instead of left
                  y: -50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0, // Slide in to its original position
                  transition: {
                    duration: 1, // Animation duration
                  },
                }}
                viewport={{ once: false }}
              >
                <h1 className="text-3xl text-white md:text-3xl lg:text-5xl font-bold my-5">
                  Unlock Your Game: Reserve Your Spot Now
                </h1>
              </motion.div>
              <motion.div
                className="card"
                initial={{
                  opacity: 0,
                  // if odd index card,slide from right instead of left
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0, // Slide in to its original position
                  transition: {
                    duration: 0.7, // Animation duration
                  },
                }}
                viewport={{ once: false }}
              >
                {/* <p className="text-slate-500 mb-5">{item.description}</p> */}
              </motion.div>
              <Link
                to="/facility"
                className="btn border-none mt-5 bg-[#3498DB] hover:bg-[#E67E22] text-white ml-3"
              >
                Book Now
              </Link>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/2">
              <motion.div
                className="card"
                initial={{
                  opacity: 0,
                  y: 150,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 1, // Animation duration
                  },
                }}
                viewport={{ once: false }}
              >
                <div className="flex justify-center">
                  <img
                    className="drop-shadow-2xl w-4/6 md:w-5/6 lg:w-5/6 rounded-md"
                    src="https://res.cloudinary.com/depy0i4bl/image/upload/v1726843804/New_Project_12_en3gw8.png"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSection;
