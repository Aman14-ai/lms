import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/context";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { isEducator } = useContext(AppContext);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/educator/educator",
      icons: assets.home_icon,
    },
    {
      name: "Add Course",
      path: "/educator/add-course",
      icons: assets.add_icon,
    },
    {
      name: "My Courses",
      path: "/educator/my-courses",
      icons: assets.my_course_icon,
    },
    {
      name: "Student Enrolled",
      path: "/educator/student-enrolled",
      icons: assets.person_tick_icon,
    },
  ];

  return (
    isEducator && (
      <>
        <div className="md:w-64 w-16 border-r min-h-screen text-base boder-gray-500 py-2 flex flex-col">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/educator"}
              className={({ isActive }) =>
                isActive
                  ? "bg-indigo-50 border-r-[6px] border-indigo-500/90 flex items-center gap-4  p-4 "
                  : "flex items-center gap-4  p-4 hover:bg-gray-100/90"
              }
            >
              <img src={item.icons} alt="icons" className="w-6 h-6" />
              <p className="md:block hidden text-center">{item.name}</p>
            </NavLink>
          ))}
        </div>
      </>
    )
  );
};

export default Sidebar;
