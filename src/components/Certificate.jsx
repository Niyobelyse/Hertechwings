import React from 'react';

const MyCourses = () => {
  const courses = [
    {
      title: "Introduction to Academic Writing",
      university: "O.P. Jindal Global University",
      grade: "92.60%"
    },
    {
      title: "Introduction to Python Programming",
      university: "University of Pennsylvania",
      grade: "95.83%"
    }
  ];

  return (
    <div className="bg-white shadow-md rounded-lg">
      {courses.map((course, index) => (
        <div 
          key={index} 
          className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50 transition"
        >
          <div>
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-gray-200 rounded mr-3 flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  className="w-6 h-6 text-gray-500"
                >
                  <path 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
                <p className="text-sm text-gray-600">{course.university}</p>
              </div>
            </div>
            <p className="text-sm text-gray-700">Grade Achieved: {course.grade}</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Add to LinkedIn
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyCourses;