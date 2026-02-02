import { useEffect, useState } from "react";
import { AppContext } from "./context.jsx";
import { dummyCourses } from "../assets/assets.js";
import humanizeDuration from "humanize-duration";

export const AppContextProvider = ({ children }) => {


  const currency = import.meta.env.VITE_CURRENCY;

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses,setEnrolledCourses] = useState([]);

  useEffect(() => {
    // fetch all courses
    const fetchAllCourses = async () => {
      setAllCourses(dummyCourses);
    };

    // fetch enrolled courses
    const fetchUserEnrolledCourses = async()=>{
      setEnrolledCourses(dummyCourses);
    }

    fetchAllCourses();
    fetchUserEnrolledCourses();
  }, []);

  // fetch enrolled courses
    const fetchUserEnrolledCourses = async()=>{
      setEnrolledCourses(dummyCourses);
    }

  // to calculate average rating of course
  const calculateAverageRating = (course) => {
    if (course.courseRatings.length === 0) return 0;

    const totalRating = course.courseRatings
      .map((courseRating) => courseRating.rating)
      .reduce((acc, curr) => acc + curr, 0);

    return (totalRating / course.courseRatings.length).toFixed(1);
  };

  // function to calculate course chapter time
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));

    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // function to calculate course duration
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map(
      (chapter) => (chapter.chapterContent.map((lecture)=> (time += lecture.lectureDuration)))
    );

    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // function to calculate number of lectures in the course
  const calculateNumberOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter)=>{
      if(Array.isArray(chapter.chapterContent))
      {
        totalLectures += chapter.chapterContent.length;
      }
    })
    return totalLectures;
  }

  const value = {
    allCourses,
    currency,
    calculateAverageRating,
    isEducator,
    setIsEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNumberOfLectures,
    enrolledCourses,fetchUserEnrolledCourses,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
