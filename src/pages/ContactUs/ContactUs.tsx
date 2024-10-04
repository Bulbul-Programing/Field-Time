import React from "react";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
const ContactUs = () => {
    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        e.currentTarget.reset()
    }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 py-10">
      <div className="text-center ">
        <h1 className="text-5xl font-extrabold mb-4">Contact Us</h1>
        <p className="text-xl">
          We are here to help! Reach out to us for any inquiries or assistance.
        </p>
      </div>

      <div className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white shadow-xl rounded-2xl p-8">
            <h2 className="text-3xl font-semibold mb-6 text-center">
              Get in Touch
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Subject"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Message
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={6}
                  placeholder="Your Message"
                ></textarea>
                <div className="flex justify-center my-2">
                  <input
                    className="btn bg-blue-500 hover:bg-blue-600 text-white text-center"
                    type="submit"
                    name=""
                    id=""
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white shadow-xl rounded-2xl p-8">
              <h2 className="text-3xl font-semibold mb-6 text-center">
                Contact Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <FaPhone className="text-2xl text-blue-600" />
                  <p className="text-lg text-gray-700">01872022662</p>
                </div>
                <div className="flex items-center gap-4">
                  <FaEnvelope className="text-2xl text-blue-600" />
                  <p className="text-lg text-gray-700">fieldtime@gmail.com</p>
                </div>
                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-2xl text-blue-600" />
                  <p className="text-lg text-gray-700">
                    123 Mirpur 10, Dhaka
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-xl rounded-2xl p-8">
              <h2 className="text-3xl font-semibold mb-6 text-center">
                Our Location
              </h2>
              <iframe
                title="Office Location"
                src="https://maps.google.com/maps?width=435&amp;height=321&amp;hl=en&amp;q=mirpur%2010,%20dhaka%20%20Dhaka+()&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
