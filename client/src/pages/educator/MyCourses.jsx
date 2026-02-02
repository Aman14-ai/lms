import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/context";
import Loading from "../../components/student/Loading";

const MyCourses = () => {
  const { currency, allCourses } = useContext(AppContext);

  const [courses, setCourses] = useState(null);

  useEffect(() => {
    const fetchEducatorCourses = async () => {
      setCourses(allCourses);
    };
    fetchEducatorCourses();
  }, [allCourses]);


  return courses ? (
    <div className="gap-8 flex flex-col items-start justify-between md:p-8 p-4 pt-8 pb-0">
      <h1 className="text-2xl font-semibold ">My courses</h1>

      <table className="table-fixed md:table-auto w-full overflow-hidden">
        <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
          <tr>
            
            <th className="px-4 py-3 font-semibold">All Courses</th>
            <th className="px-4 py-3 font-semibold">Earnings</th>
            <th className="px-4 py-3 font-semibold">Students</th>
            <th className="px-4 py-3 font-semibold">Published On</th>
          </tr>
        </thead>

        <tbody className="text-sm text-gray-500">
          {courses.map((item, index) => (
            <tr className="border-b border-gray-500/20" key={index}>
              
              <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                <img
                  className="w-9 h-9 rounded-full"
                  src={item.courseThumbnail}
                  alt=""
                />
                <span className="truncate">{item.courseTitle}</span>
              </td>

              <td className="px-4 py-3 text-center hidden sm:table-cell">
                {currency} {Math.round(item.coursePrice - item.coursePrice * item.discount / 100) * item.enrolledStudents.length}
              </td>
              <td className="px-4 py-3 truncate">{item.enrolledStudents.length}</td>
              <td className="px-4 py-3 truncate">{new Date(item.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ):(<Loading />);
};

export default MyCourses;
