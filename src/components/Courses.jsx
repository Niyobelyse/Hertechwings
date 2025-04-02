import React, { useEffect, useState } from 'react';

const CourseCard = ({ image, logo, organization, title, description }) => {
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
        <div className="flex items-center mb-3">
          {logo && (
            <div className="w-8 h-8 mr-2 flex-shrink-0">
              <img 
                src={logo} 
                alt={organization} 
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <span className="text-gray-600 text-sm">{organization}</span>
        </div>
        <h3 className="font-bold text-lg mb-2 text-gray-900">{title}</h3>
        {description && <p className="text-gray-600 mb-3 text-sm">{description}</p>}
      </div>
    </div>
  );
};

const CourseSection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/homepage-courses/'); 
        if (!response.ok) throw new Error("Failed to fetch courses");
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
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Available Courses at HerTechWings</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <CourseCard 
            key={course.id} 
            image={course.image ? `http://127.0.0.1:8080${course.image}` : "python.webp"}
            logo={course.logo || ""}
            title={course.title}
            description={course.description}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseSection;
