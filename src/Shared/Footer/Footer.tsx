import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer bg-[#ECF0F1] p-10 mt-10">
      <aside>
        <img
          className="w-20"
          src="https://res.cloudinary.com/dmncfe9eh/image/upload/v1726666040/New_Project_11_nbylqf.png"
          alt=""
        />
        <p className="text-xl font-bold">Field Time</p>
      </aside>
      <nav>
        <div>
          <h1 className="text-lg text-slate-500 mb-3 font-medium">Important link</h1>

          <Link
            to="/facility"
            className=" border-b  inline border-black hover:border-blue-500 hover:text-blue-500"
          >
            Facility
          </Link> <br />
          <Link
            to="/contactUs"
            className=" border-b border-black hover:border-blue-500 hover:text-blue-500"
          >
            Contact us
          </Link> <br />
          <Link
            to="/about"
            className=" border-b border-black hover:border-blue-500 hover:text-blue-500"
          >
            About us
          </Link>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
