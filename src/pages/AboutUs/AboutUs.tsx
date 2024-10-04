import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className=" relative ">
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/depy0i4bl/image/upload/v1728056839/2390_jwedfr.jpg')",
          }}
        ></div>
        <div className=" bg-black bg-opacity-40 py-20 px-10 text-white relative ">
          <div className="lg:w-1/2  lg:text-left">
            <h1 className="text-6xl font-bold mb-6">About Us</h1>
            <p className="text-xl mb-6">
              We are a team of innovators committed to making the world a better
              place. Our mission is to provide excellent services, solve complex
              challenges, and inspire our community with innovation.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-3">
            Our mission is driven by innovation, collaboration, and the desire
            to create sustainable solutions for our customers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-10 px-6">
          <div className="relative group bg-gradient-to-tr from-blue-600 to-purple-500 p-8 rounded-xl shadow-lg text-white hover:scale-105 transition transform">
            <div className="absolute -top-10 left-5 h-20 w-20 bg-white rounded-full flex items-center justify-center group-hover:bg-yellow-400 transition">
              <img
                src="https://res.cloudinary.com/depy0i4bl/image/upload/v1728056068/creativity_7119415_afi6cl.png"
                alt="Innovation"
                className="w-10 h-10"
              />
            </div>
            <h3 className="text-2xl font-bold mb-3 mt-8">Innovation</h3>
            <p>
              We drive innovation with cutting-edge solutions that inspire our
              clients and help them grow.
            </p>
          </div>

          <div className="relative group bg-gradient-to-tr from-green-600 to-teal-500 p-8 rounded-xl shadow-lg text-white hover:scale-105 transition transform">
            <div className="absolute -top-10 left-5 h-20 w-20 bg-white rounded-full flex items-center justify-center group-hover:bg-yellow-400 transition">
              <img
                src="https://res.cloudinary.com/depy0i4bl/image/upload/v1728056063/target-audience_15367641_fgap51.png"
                alt="Customer Focus"
                className="w-16 h-16"
              />
            </div>
            <h3 className="text-2xl font-bold mb-3 mt-8">Customer Focus</h3>
            <p>
              Our customers are at the center of everything we do. We prioritize
              their needs in all our projects.
            </p>
          </div>

          <div className="relative group bg-gradient-to-tr from-yellow-500 to-orange-400 p-8 rounded-xl shadow-lg text-white hover:scale-105 transition transform">
            <div className="absolute -top-10 left-5 h-20 w-20 bg-white rounded-full flex items-center justify-center group-hover:bg-yellow-400 transition">
              <img
                src="https://res.cloudinary.com/depy0i4bl/image/upload/v1728056064/planet-earth_1598196_tozllx.png"
                alt="Sustainability"
                className="w-16 h-16"
              />
            </div>
            <h3 className="text-2xl font-bold mb-3 mt-8">Sustainability</h3>
            <p>
              We embrace sustainable practices and strive to reduce our
              environmental impact with every project.
            </p>
          </div>

          <div className="relative group bg-gradient-to-tr from-red-600 to-pink-500 p-8 rounded-xl shadow-lg text-white hover:scale-105 transition transform">
            <div className="absolute -top-10 left-5 h-20 w-20 bg-white rounded-full flex items-center justify-center group-hover:bg-yellow-400 transition">
              <img
                src="https://res.cloudinary.com/depy0i4bl/image/upload/v1728056059/united_1534938_lq6ftx.png"
                alt="Collaboration"
                className="w-16 h-16"
              />
            </div>
            <h3 className="text-2xl font-bold mb-3 mt-8">Collaboration</h3>
            <p>
              Working together with our partners and clients, we achieve better
              results and foster innovation.
            </p>
          </div>
        </div>
      </div>

      <div className=" px-5 bg-base-100">
        <div className="text-center mb-12">
          <h2 className=" text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="lg:text-lg text-gray-600 mb-3">
            A diverse team of passionate individuals, united by a shared vision
            of excellence.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6">
          <div className="group relative overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://res.cloudinary.com/depy0i4bl/image/upload/v1728055689/albert-dera-ILip77SbmOE-unsplash_1_jsz1sx.jpg"
              alt="Team Member"
              className="w-full image-full h-72 object-cover rounded-lg group-hover:scale-110 transition duration-500"
            />
            <div className="lg:absolute lg:inset-0 bg-gradient-to-t lg:from-black via-transparent lg:opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-6 lg:text-white">
              <h3 className="text-2xl font-bold">Mostofa Kamal</h3>
              <p className="font-medium">CEO & Founder</p>
              <div className="flex space-x-4 mt-2">
                <a
                  href="https://twitter.com"
                  className="lg:text-white hover:text-blue-400"
                >
                  <FaTwitter size={24} />
                </a>
                <a
                  href="https://facebook.com"
                  className="lg:text-white hover:text-blue-600"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href="https://linkedin.com"
                  className="lg:text-white hover:text-blue-700"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href="https://instagram.com"
                  className="lg:text-white hover:text-pink-400"
                >
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
