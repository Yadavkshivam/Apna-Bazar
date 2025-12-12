import React, { useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import EmailDrop from "../components/DropEmail";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [EmailPage, setEmailPage] = useState(false);

  const missedCall = () => {
    alert("Successfully missed call to owner...");
  };

  const writeEmail = () => {
    setEmailPage(true);
  };

  useEffect(() => {
    if (EmailPage) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [EmailPage]);

  return (
    <footer className="mt-10 bg-[#1f3b2c] text-white w-full pt-10 pb-24 px-6 md:px-14 relative ">

      <div className="grid md:grid-cols-3 gap-10">

        <div>
          <h2 className="text-xl font-semibold mb-3 text-green-300">About Us</h2>
          <p className="text-large leading-6 text-gray-200">
            Apna-Bazar is one of the largest full-stack AgriTech platforms helping farmers
            improve their productivity, reduce costs, and adopt modern agriculture 
            solutions. We bridge the gap between technology and agriculture using 
            data-driven insights.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3 text-green-300">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-green-300 cursor-pointer">About Us</li>
            <li className="hover:text-green-300 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-green-300 cursor-pointer">Return & Refund Policy</li>
            <li className="hover:text-green-300 cursor-pointer">Terms of Service</li>
            <li className="hover:text-green-300 cursor-pointer">Shipping Policy</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3 text-green-300">Contact Us</h2>

          <div className="relative">
            <button className="bg-orange-500 gap-4 hover:bg-orange-600 text-white px-3 py-2 rounded-md text-sm w-fit">
              1800 3000 2434
            </button>

            <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md text-sm w-fit">
              +91 8050797979
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 justify-center mt-10 text-3xl">
        <a className="hover:text-blue-400 transition-transform hover:scale-125"><FaFacebook /></a>
        <a className="hover:text-pink-300 transition-transform hover:scale-125"><FaInstagram /></a>
        <a
          href="https://www.linkedin.com/in/shivam-yadav-696a8725a/"
          className="hover:text-green-300 transition-transform hover:scale-125"
        >
          <FaLinkedin />
        </a>
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="
           bottom-6 right-6
          h-16 w-16 rounded-full
          bg-green-600 text-white font-semibold
          flex items-center justify-center
          shadow-xl
          hover:bg-green-700 hover:scale-110
          transition-all duration-300
          z-50
          animate-bounce
        "
      >
        {open ? (
          <HiX className="text-3xl" />
        ) : (
          <span className="text-xs font-bold text-white">Contact Us</span>
        )}
      </button>

      {open && (
        <div
          className="
            fixed bottom-28 right-6 w-72
            bg-white text-black rounded-xl shadow-2xl
            p-5 flex flex-col gap-3
            z-50
            animate-[slideUp_0.35s_ease-out]
            [@keyframes_slideUp]:from:opacity-0
            [@keyframes_slideUp]:from:translateY(30px)
            [@keyframes_slideUp]:to:opacity-100
            [@keyframes_slideUp]:to:translateY(0)
          "
        >
          <button
            onClick={writeEmail}
            className="flex items-center gap-2 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition"
          >
            💬 Drop a Email
          </button>

          <button
            onClick={missedCall}
            className="flex items-center gap-3 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition"
          >
            📞 Missed Call
          </button>
        </div>
      )}

      {EmailPage && (
        <div className="fixed px-20 py-30 inset-0 bg-emerald-100 backdrop-blur-sm flex items-center justify-center z-[300] animate-fadeIn">

     
          <div className="relative bg-emerald-100 w-[90%] max-w-lg mx-auto p-6 rounded-2xl shadow-xl animate-scaleIn">

            {/* Close button */}
            <button
              onClick={() => setEmailPage(false)}
              className="absolute top-9 right-1.5 text-gray-600 hover:text-900"
            >
              <div className="bg-red-400 rounded-lg shadow-md hover:bg-red-600">
              <HiX className="text-4xl" />
              </div>
            </button>

            <EmailDrop />
          </div>
        </div>
      )}

      <p className="text-center text-xl text-gray-400 mt-10">
        © 2025 Apna-Bazar Agro Private Limited — All Rights Reserved.
      </p>

    </footer>
  );
};

export default Footer;
