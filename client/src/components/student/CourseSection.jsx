import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import { AppContext } from "../../context/context.jsx";

const CourseSection = () => {
  const { allCourses } = useContext(AppContext);
  console.log("all courses: ", allCourses);
  return (
    <div className="pt-16 md:px-40 px-8 flex flex-col items-center space-y-4">
      <h2 className="text-3xl font-medium text-gray-800">
        Learn from the best 
      </h2>
      <p className="text-sm md:text-base text-gray-500 ">
        Discover our top-rated courses across various categories. From coding
        and design to <br /> business and wellness, our courses are crafted to
        deliver results.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 md:px-0 my-10 md:my-16">
        {allCourses.slice(0, 4).map((course, index) => (
          <CourseCard course={course} key={index} />
        ))}
      </div>

      <Link
        to={"/course-list"}
        onClick={() => scrollTo(0, 0)}
        className="text-gray-500 border border-gray-500/30 px-10 py-3 rounded"
      >
        Show All Courses
      </Link>
    </div>
  );
};

export default CourseSection;
