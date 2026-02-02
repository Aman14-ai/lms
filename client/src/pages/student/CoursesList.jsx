import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "../../components/student/SearchBar";
import { AppContext } from "../../context/context";
import CourseCard from "../../components/student/CourseCard";
import { assets } from "../../assets/assets";
import Footer from "../../components/student/Footer";

const CoursesList = () => {
  const navigate = useNavigate();
  const { input } = useParams();
  const { allCourses } = useContext(AppContext);
  const [filteredCourse, setFilteredCourse] = useState([]);

  console.log("filtered course: ", filteredCourse);

  useEffect(() => {
    const tempCourses = allCourses.slice();
    input
      ? // eslint-disable-next-line react-hooks/set-state-in-effect
        setFilteredCourse(
          tempCourses.filter((course) =>
            course.courseTitle.toLowerCase().includes(input.toLowerCase())
          )
        )
      : setFilteredCourse(tempCourses);
  }, [input, allCourses]);

  return (
    <>
      <div className="relative md:px-36 px-8 pt-20  text-left">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">
              Course List
            </h1>
            <p className="text-gray-500">
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => navigate("/")}
              >
                Home
              </span>{" "}
              /{" "}
              <span
                className="cursor-pointer"
                onClick={() => navigate("/course-list")}
              >
                Course List
              </span>
            </p>
          </div>
          <SearchBar data={input} />
        </div>

        {input && (
          <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600 border-gray-600/30 rounded">
            <p>{input}</p>
            <img
              src={assets.cross_icon}
              alt="cross_icon"
              className="cursor-pointer"
              onClick={() => navigate("/course-list")}
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2md:p-0">
          {filteredCourse.map((course, index) => (
            <CourseCard course={course} key={index} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CoursesList;
