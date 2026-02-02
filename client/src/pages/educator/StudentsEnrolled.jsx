import React, { useEffect, useState } from "react";
import { dummyStudentEnrolled } from "../../assets/assets";
import Loading from "../../components/student/Loading";

const StudentsEnrolled = () => {
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      setEnrolledStudents(dummyStudentEnrolled);
    };
    fetchEnrolledStudents();
  }, []);

  return enrolledStudents ? (
    <div>
      <table className="table-fixed md:table-auto w-full overflow-hidden">
        <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
          <tr>
            <th className="text-center px-4 py-3 font-semibold">#</th>
            <th className="px-4 py-3 font-semibold">Student Name</th>
            <th className="px-4 py-3 font-semibold">Course Title</th>
            <th className="px-4 py-3 font-semibold">Purchased On</th>
          </tr>
        </thead>

        <tbody className="text-sm text-gray-500">
          {enrolledStudents.map((item, index) => (
            <tr className="border-b border-gray-500/20" key={index}>
              <td className="px-4 py-3 text-center hidden sm:table-cell">
                {index+1}
              </td>
              <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                <img
                  className="w-9 h-9 rounded-full"
                  src={item.student.imageUrl}
                  alt=""
                />
                <span className="truncate">{item.student.name}</span>
              </td>

              
              <td className="px-4 py-3 truncate">
                {item.courseTitle}
              </td>
              <td className="px-4 py-3 truncate">
                {new Date(item.purchaseDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <Loading />
  );
};

export default StudentsEnrolled;
