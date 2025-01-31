import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "/logo.jpg";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <div className="w-full container mx-auto lg:px-[200px]  px-3 flex items-center justify-between py-2">
        <a href="/" className="flex items-center justify-center gap-1">
          <img
            src={logo}
            alt="logo"
            className="lg:w-[50px] lg:h-[50px] rounded-md mr-2 w-[40px] h-[40px]"
          />
          <p className="lg:text-xl text-base font-bold">PowerEnergy</p>
        </a>
        <ul className="lg:flex items-center justify-center gap-6 flex-nowrap hidden">
          <Link
            onClick={() => {
              setIsOpen(false);
            }}
            className={`${
              location.pathname == "/" ? "text-white" : "text-slate-700"
            }`}
          >
            Home
          </Link>
          <Link
            to="/controls"
            className={`${
              location.pathname == "/controls" ? "text-white" : "text-slate-700"
            }`}
          >
            Controls
          </Link>
          <Link
            to="/expense"
            className={`${
              location.pathname == "/expense" ? "text-white" : "text-slate-700"
            }`}
          >
            Expenses
          </Link>
          <Link
            to="/schedule"
            className={`${
              location.pathname == "/schedule" ? "text-white" : "text-slate-700"
            }`}
          >
            Schedule
          </Link>
        </ul>
        {/* mobile nav */}
        <div className="lg:hidden">
          <IoMenu className="text-3xl" onClick={() => setIsOpen(true)} />
        </div>
      </div>

      {/* mobile menu */}

      {isOpen && (
        <div className="mt-4 lg:hidden">
          <div className="w-full flex items-center justify-end">
            <IoClose
              className="text-3xl mr-3"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <ul className="w-full bg-slate-800  p-4  mr-[20px]">
            <ul className="w-full text-center py-3">
              <span
                onClick={() => {
                  setIsOpen(false);
                  navigate("/");
                }}
              >
                Home
              </span>
            </ul>
            <ul className="w-full text-center py-3">
              <span
                onClick={() => {
                  setIsOpen(false);
                  navigate("/expense");
                }}
              >
                Expenses
              </span>
            </ul>
            <ul className="w-full text-center py-3">
              <span
                onClick={() => {
                  setIsOpen(false);
                  navigate("/controls");
                }}
              >
                Controls
              </span>
            </ul>
            <ul className="w-full text-center py-3">
              <span
                onClick={() => {
                  setIsOpen(false);
                  navigate("/schedule");
                }}
              >
                Schedule
              </span>
            </ul>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
