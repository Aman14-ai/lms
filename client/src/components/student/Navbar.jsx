import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { AppContext } from "../../context/context";

const Navbar = () => {


  const navigate = useNavigate();
  const { isEducator } = useContext(AppContext);
  const { openSignIn } = useClerk();
  const { user } = useUser();
  console.log("current user:", user);

  const isCourseListPage = location.pathname.includes("/course-list");

  return (
    <div
      className={`flex justify-between items-center px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="w-28 lg:w-32 cursor-pointer"
      />
      {/* for desktop view */}
      <div className="hidden md:flex text-gray-500 items-center gap-5">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button
                className="cursor-pointer"
                onClick={() => navigate("/educator/educator")}
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
              | <Link to={"/my-enrollments"}>My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="cursor-pointer rounded-full bg-blue-600 text-white px-5 py-2 "
          >
            Create Account
          </button>
        )}
      </div>
      {/* for mobile view */}
      <div className="flex md:hidden items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && (
            <>
              <button>Become Educator</button>|{" "}
              <Link to={"/my-enrollments"}>My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button className="cursor-pointer" onClick={() => openSignIn()}>
            <img src={assets.user_icon} alt="user" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
