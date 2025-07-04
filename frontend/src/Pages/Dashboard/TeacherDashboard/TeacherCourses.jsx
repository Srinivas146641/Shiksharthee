import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Popup from './Popup';

function TeacherCourses() {
  const [showPopup, setShowPopup] = useState(false);
  const [subject, setSubject] = useState('');
  const [courses, setCourses] = useState([]);
  const { ID } = useParams(); // teacher ID from URL

  const crreateCourse = (sub) => {
    setSubject(sub);
    setShowPopup(true);
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch(`/api/course/teacher/${ID}/enrolled`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (Array.isArray(result)) {
        setCourses(result);
      } else {
        setCourses([]);
        console.warn('Unexpected course data:', result);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [showPopup, ID]);

  const subjectList = ['Physics', 'Chemistry', 'Biology', 'Math', 'Computer'];
  const imageUrls = [
    "https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/8e9bf690d23d886f63466a814cfbec78187f91d2",
    "https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/3e546b344774eb0235acc6bf6dad7814a59d6e95",
    "https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/28ac70002ae0a676d9cfb0f298f3e453d12b5555",
    "https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/61930117e428a1f0f7268f888a84145f93aa0664",
    "https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/a64c93efe984ab29f1dfb9e8d8accd9ba449f272",
  ];

  return (
    <>
      {/* Subject Cards */}
      <div className='flex gap-10 pl-48 mx-48 mt-11 flex-wrap justify-center'>
        {subjectList.map((subjectName, index) => (
          <div
            key={subjectName}
            className="subject cursor-pointer text-white text-center"
            onClick={() => crreateCourse(subjectName)}
          >
            <img
              src={imageUrls[index]}
              alt={subjectName}
              className="h-28 w-28 object-cover rounded-full"
            />
            <p className="mt-2 font-medium">{subjectName}</p>
          </div>
        ))}
      </div>

      {/* Popup to Create New Course */}
      {showPopup && (
        <Popup onClose={() => setShowPopup(false)} subject={subject} />
      )}

      {/* Display Created Courses */}
      <div className='mt-12 mx-48'>
        <h2 className="text-2xl font-bold mb-4 text-white">Your Created Courses</h2>
        <div className="grid grid-cols-2 gap-6">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course._id} className="bg-white text-black p-4 rounded shadow-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold capitalize">{course.coursename}</h3>
                  <span className={`text-sm px-2 py-1 rounded ${course.isapproved ? 'bg-green-200 text-green-700' : 'bg-yellow-200 text-yellow-800'}`}>
                    {course.isapproved ? 'Approved' : 'Pending'}
                  </span>
                </div>
                <p className="text-gray-700 mt-2">{course.description || 'No description provided.'}</p>
              </div>
            ))
          ) : (
            <p className="text-white">No courses added yet.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default TeacherCourses;
