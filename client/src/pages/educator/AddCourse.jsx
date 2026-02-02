import React, { useEffect, useRef, useState, useCallback } from "react";
import uniqid from "uniqid";
import Quill from "quill";
import { assets } from "../../assets/assets";

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  const handleChapter = useCallback((action, chapterId) => {
    if (action === "add") {
      const title = prompt("Enter chapter title");
      if (title && title.trim().length > 0) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title.trim(),
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters[chapters.length - 1].chapterOrder + 1 : 1,
        };
        setChapters(prev => [...prev, newChapter]);
      }
    } else if (action === "remove") {
      setChapters(prev => prev.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === "toggle") {
      setChapters(prev =>
        prev.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  }, [chapters]);

  const handleLecture = useCallback((action, chapterId, lectureIndex) => {
    if (action === "add") {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === "remove") {
      setChapters(prev =>
        prev.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            return {
              ...chapter,
              chapterContent: chapter.chapterContent.filter((_, index) => index !== lectureIndex)
            };
          }
          return chapter;
        })
      );
    }
  }, []);

  const addLecture = useCallback(() => {
    if (!lectureDetails.lectureTitle.trim() || !lectureDetails.lectureDuration || !lectureDetails.lectureUrl) {
      alert("Please fill all required lecture fields");
      return;
    }

    setChapters(prev =>
      prev.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureTitle: lectureDetails.lectureTitle.trim(),
            lectureDuration: parseInt(lectureDetails.lectureDuration) || 0,
            lectureOrder: chapter.chapterContent.length > 0
              ? chapter.chapterContent[chapter.chapterContent.length - 1].lectureOrder + 1
              : 1,
            lectureId: uniqid(),
          };
          return {
            ...chapter,
            chapterContent: [...chapter.chapterContent, newLecture]
          };
        }
        return chapter;
      })
    );
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
    setShowPopup(false);
  }, [currentChapterId, lectureDetails]);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert("Please select an image file");
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (!courseTitle.trim()) {
      alert("Course title is required");
      return;
    }
    
    if (chapters.length === 0) {
      alert("Please add at least one chapter");
      return;
    }

    // Validate all chapters have at least one lecture
    const emptyChapters = chapters.filter(chapter => chapter.chapterContent.length === 0);
    if (emptyChapters.length > 0) {
      alert(`Chapter "${emptyChapters[0].chapterTitle}" has no lectures. Please add at least one lecture.`);
      return;
    }

    const courseData = {
      courseTitle: courseTitle.trim(),
      courseDescription: quillRef.current?.root.innerHTML || "",
      coursePrice: parseFloat(coursePrice) || 0,
      discount: Math.min(100, Math.max(0, parseInt(discount) || 0)),
      image,
      chapters: chapters.map(chapter => ({
        ...chapter,
        chapterContent: chapter.chapterContent.map(lecture => ({
          ...lecture,
          lectureDuration: parseInt(lecture.lectureDuration) || 0
        }))
      }))
    };

    console.log("Submitting course:", courseData);
    // Add your submission logic here
  }, [courseTitle, coursePrice, discount, image, chapters]);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Enter course description...",
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'clean']
          ]
        }
      });
    }
  }, []);

  // Cleanup image preview URL
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="h-screen overflow-auto flex flex-col items-start md:p-8 p-4 pt-8 pb-0">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg w-full">
        <div className="flex flex-col gap-1">
          <label htmlFor="courseTitle" className="font-medium">Course Title</label>
          <input
            id="courseTitle"
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Enter course title"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="font-medium">Course Description</label>
          <div ref={editorRef} className="min-h-32 border border-gray-500 rounded"></div>
        </div>

        <div className="flex items-center gap-5 justify-between flex-wrap">
          <div className="flex flex-col gap-1">
            <label htmlFor="coursePrice" className="font-medium">Course Price ($)</label>
            <input
              id="coursePrice"
              type="number"
              value={coursePrice}
              onChange={(e) => setCoursePrice(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="outline-none md:py-2.5 py-2 w-32 px-3 rounded border border-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium">Course Thumbnail</p>
            <label htmlFor="thumbnail" className="flex items-center gap-3 cursor-pointer">
              <div className="p-3 bg-blue-500 rounded hover:bg-blue-600 transition-colors">
                <img src={assets.file_upload_icon} alt="Upload icon" className="w-6 h-6" />
              </div>
              <span className="text-gray-600">Upload image</span>
              <input
                type="file"
                id="thumbnail"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </label>
            {imagePreview && (
              <div className="mt-2 relative">
                <img
                  className="max-h-24 rounded border border-gray-300"
                  src={imagePreview}
                  alt="Course thumbnail preview"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setImagePreview("");
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="discount" className="font-medium">Discount %</label>
          <input
            id="discount"
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            min={0}
            max={100}
            placeholder="0-100"
            className="outline-none md:py-2.5 py-2 w-28 px-3 border border-gray-500 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Chapters and Lectures */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-3">Course Chapters</h3>
          {chapters.length === 0 && (
            <p className="text-gray-500 text-center py-4">No chapters added yet. Click "Add Chapter" to start.</p>
          )}
          {chapters.map((chapter, chapterIndex) => (
            <div className="bg-white border rounded-lg mb-4 shadow-sm hover:shadow-md transition-shadow" key={chapter.chapterId}>
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center">
                  <button
                    onClick={() => handleChapter("toggle", chapter.chapterId)}
                    className={`mr-2 cursor-pointer transition-transform ${chapter.collapsed && "-rotate-90"}`}
                  >
                    <img src={assets.dropdown_icon} width={14} alt={chapter.collapsed ? "Expand" : "Collapse"} />
                  </button>
                  <span className="font-semibold">
                    Chapter {chapterIndex + 1}: {chapter.chapterTitle}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-500 text-sm">
                    {chapter.chapterContent.length} lecture{chapter.chapterContent.length !== 1 ? 's' : ''}
                  </span>
                  <button
                    onClick={() => handleChapter("remove", chapter.chapterId)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <img src={assets.cross_icon} className="w-4 h-4" alt="Remove chapter" />
                  </button>
                </div>
              </div>
              {!chapter.collapsed && (
                <div className="p-4">
                  {chapter.chapterContent.length === 0 ? (
                    <p className="text-gray-500 text-sm mb-3">No lectures in this chapter yet.</p>
                  ) : (
                    <div className="space-y-2 mb-4">
                      {chapter.chapterContent.map((lecture, lectureIndex) => (
                        <div
                          className="flex justify-between items-center p-2 hover:bg-gray-50 rounded"
                          key={lecture.lectureId}
                        >
                          <div className="flex-1">
                            <span className="font-medium">
                              {lectureIndex + 1}. {lecture.lectureTitle}
                            </span>
                            <span className="text-sm text-gray-600 ml-2">
                              • {lecture.lectureDuration} min
                              • <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                                href={lecture.lectureUrl}
                              >
                                View
                              </a>
                              • {lecture.isPreviewFree ? (
                                <span className="text-green-600">Free Preview</span>
                              ) : (
                                <span className="text-gray-600">Paid</span>
                              )}
                            </span>
                          </div>
                          <button
                            onClick={() => handleLecture("remove", chapter.chapterId, lectureIndex)}
                            className="text-gray-400 hover:text-red-500 ml-2"
                          >
                            <img src={assets.cross_icon} className="w-3 h-3" alt="Remove lecture" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={() => handleLecture("add", chapter.chapterId)}
                    className="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 p-2 rounded cursor-pointer transition-colors text-sm"
                  >
                    + Add Lecture
                  </button>
                </div>
              )}
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => handleChapter("add")}
            className="flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 p-3 rounded-lg cursor-pointer transition-colors w-full mt-4"
          >
            <span className="text-lg">+</span>
            <span className="font-medium">Add Chapter</span>
          </button>
        </div>

        {/* Lecture Popup */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white text-gray-700 p-6 rounded-lg shadow-xl relative w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Add New Lecture</h2>
                <button
                  onClick={() => {
                    setShowPopup(false);
                    setLectureDetails({
                      lectureTitle: "",
                      lectureDuration: "",
                      lectureUrl: "",
                      isPreviewFree: false,
                    });
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <img src={assets.cross_icon} className="w-5 h-5" alt="Close" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Lecture Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    type="text"
                    value={lectureDetails.lectureTitle}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureTitle: e.target.value,
                      })
                    }
                    placeholder="Enter lecture title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Duration (minutes) <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    type="number"
                    min="1"
                    value={lectureDetails.lectureDuration}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureDuration: e.target.value,
                      })
                    }
                    placeholder="Enter duration"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Lecture URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    type="url"
                    value={lectureDetails.lectureUrl}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureUrl: e.target.value,
                      })
                    }
                    placeholder="https://example.com/lecture"
                  />
                </div>
                
                <div className="flex items-center gap-2 pt-2">
                  <input
                    id="isPreviewFree"
                    className="w-4 h-4"
                    type="checkbox"
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.checked,
                      })
                    }
                  />
                  <label htmlFor="isPreviewFree" className="text-sm font-medium">
                    Available as free preview
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setShowPopup(false);
                    setLectureDetails({
                      lectureTitle: "",
                      lectureDuration: "",
                      lectureUrl: "",
                      isPreviewFree: false,
                    });
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={addLecture}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                >
                  Add Lecture
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="bg-black hover:bg-gray-800 text-white w-full py-3 px-8 rounded-lg my-6 transition-colors font-medium"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;