import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTasks } from 'react-icons/fa';

const CourseListSection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/courses/');
        if (!response.ok) throw new Error('Failed to fetch courses');
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading courses...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <CourseCard
            key={course.id}
            id={course.id}
            image={course.image}
            title={course.title}
            description={course.description}
          />
        ))}
      </div>
    </div>
  );
};

const CourseCard = ({ id, image, title, description }) => {
  const navigate = useNavigate();

  const handleViewAssignments = () => {
    navigate(`/courses/${id}/assignments`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-40 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">

            <h3 className="font-bold text-lg text-gray-900">{title}</h3>
          </div>
          <button
            onClick={handleViewAssignments}
            className="text-blue-600 hover:text-blue-800"
            title="View Assignments"
          >
  
          </button>
        </div>
        {description && <p className="text-gray-600 mb-3 text-sm">{description}</p>}
      </div>
    </div>
  );
};

export default CourseListSection;