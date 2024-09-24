const FAQComponent = () => {
  return (
    <div className=" mx-5 md:mx-10 lg:mx-10">
      <div>
        <h1 className=" text-2xl md:text-3xl lg:text-3xl font-semibold">
          Frequently Asked Questions :
        </h1>
        <p className=" text-base md:text-lg lg:text-lg my-3 md:my-3 lg:my-5 text-[#34495E] w-3/4">
          Find answers to your questions about booking sports facilities easily
          and quickly. Our FAQs cover everything you need to know.
        </p>
      </div>
      <div className="justify-between items-center flex flex-col md:flex-row lg:flex-row gap-x-5">
        <img className=" w-full md:hidden lg:w-1/2 lg:block " src="https://res.cloudinary.com/depy0i4bl/image/upload/v1726860676/9650829_7879_dtf8ob.jpg" alt="" />
        <div className="space-y-3 w-full md:w-full lg:w-1/2">
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-lg md:text-xl lg:text-xl font-medium">
              How do I book a facility?
            </div>
            <div className="collapse-content">
              <p>
                Booking a facility is simple! Just browse the available options,
                select your preferred time, and complete the reservation through
                our online booking system.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-lg md:text-xl lg:text-xl font-medium">
              Can I cancel or reschedule my booking?
            </div>
            <div className="collapse-content">
              <p>
                Yes, you can cancel or reschedule your booking up to 24 hours
                before the scheduled time. Simply log in to your account and
                modify your reservation.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-lg md:text-xl lg:text-xl font-medium">
              What payment methods do you accept?
            </div>
            <div className="collapse-content">
              <p>
                We accept all major credit cards, debit cards, and digital
                payment methods such as PayPal and mobile wallets.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-lg md:text-xl lg:text-xl font-medium">
              Are your facilities open year-round?
            </div>
            <div className="collapse-content">
              <p>
                Yes, our sports facilities are open year-round, with special
                hours during holidays. Check the specific facility’s page for
                more details.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-lg md:text-xl lg:text-xl font-medium">
              Do you offer any discounts for group bookings?
            </div>
            <div className="collapse-content">
              <p>
                Yes, we offer special discounts for group bookings and long-term
                reservations. Contact our support team for more information.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-lg md:text-xl lg:text-xl font-medium">
              Is parking available at the facilities?
            </div>
            <div className="collapse-content">
              <p>
                Yes, we provide ample parking space at all our facilities, free
                of charge for our customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQComponent;
