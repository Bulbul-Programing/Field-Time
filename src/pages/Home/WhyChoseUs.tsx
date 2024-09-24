import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const WhyChoseUs = () => {
  return (
    <div className="flex flex-col md:flex-col lg:flex-row md:items-start lg:justify-between lg:items-center my-10 md:my-12 lg:my-20 mx-5 md:mx-10 lg:mx-10 gap-y-5 gap-x-5 md:gap-x-10 lg:gap-x-10">
      <div className="w-full md:w-full lg:w-1/2">
        <motion.div>
          <p className="text-[#3498DB] text-base md:text-lg lg:text-lg font-medium">
            WHY CHOOSE US
          </p>
          <h1 className="text-2xl md:text-2xl lg:text-4xl my-3 font-bold">
            Provide Quality Festal Field
          </h1>
          <p className="text-[#34495E] text-sm md:text-sm lg:text-base mt-3">
            At our sports facility, we offer unmatched quality, exceptional
            service, and world-class standards. Here’s why we stand out:
          </p>
          <Link
            to="/about"
            className="btn mt-3 bg-[#3498DB] hover:bg-[#E67E22] text-white font-medium"
          >
            Read More
          </Link>
        </motion.div>
      </div>
      <img
        className=" rounded-md md:rotate-0 lg:rotate-90 md:w-full lg:w-1/4"
        src="https://res.cloudinary.com/depy0i4bl/image/upload/v1726850634/aerial-view-deserted-basketball-bright-court_213438-3869_blfstk.avif"
        alt=""
      />
      <div className="space-y-5">
        <div className="flex items-center gap-x-3 ">
          <img
            src="https://res.cloudinary.com/depy0i4bl/image/upload/v1726852258/g1918-qh52g58luzg7d76y1o2jpo1b6unvw96hkvxbnvp83g_ufi9zx.png"
            alt=""
          />
          <div>
            <p className="text-lg font-semibold mb-2">Standard International</p>
            <p className="text-[#34495E] text-sm w-full md:w-full lg:w-3/4">
              Our facilities meet international standards, ensuring a premium
              experience.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          <img
            src="https://res.cloudinary.com/depy0i4bl/image/upload/v1726852258/g1854-qh52g2f3ahccedb1i4uo06qxep1s95vakhyv81tem4_pgfful.png"
            alt=""
          />
          <div>
            <p className="text-lg font-semibold mb-2">The Best Choice</p>
            <p className="text-[#34495E] text-sm w-full md:w-full lg:w-3/4">
              With a perfect blend of quality and convenience, we are the go-to
              destination.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-3 ">
          <img
            src="https://res.cloudinary.com/depy0i4bl/image/upload/v1726852258/g1949-qh52g4aro5ex1l8b75nx569ulgsiok2r8r9u6lqm9o_sekbkc.png"
            alt=""
          />
          <div>
            <p className="text-lg font-semibold mb-2">Number One</p>
            <p className="text-[#34495E] text-sm w-full md:w-full lg:w-3/4">
              We are the top-rated choice for sports enthusiasts seeking the
              best facilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoseUs;
