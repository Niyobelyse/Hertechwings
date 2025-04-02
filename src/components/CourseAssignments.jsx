import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, Clock, CheckCircle, ChevronDown, ChevronRight } from 'lucide-react';

const CourseAssignments = () => {
  const { courseId } = useParams();
  const [upcomingAssignments, setUpcomingAssignments] = useState([]);
  const [pastAssignments, setPastAssignments] = useState([]);
  const [expandUpcoming, setExpandUpcoming] = useState(true);
  const [expandPast, setExpandPast] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const upcomingResponse = await fetch(`https://belyse.pythonanywhere.com//courses/${courseId}/assignments/?type=upcoming`);
        const pastResponse = await fetch(`https://belyse.pythonanywhere.com//courses/${courseId}/assignments/?type=past`);

        if (!upcomingResponse.ok || !pastResponse.ok) {
          throw new Error("Failed to fetch assignments");
        }

        const upcomingData = await upcomingResponse.json();
        const pastData = await pastResponse.json();

        setUpcomingAssignments(upcomingData);
        setPastAssignments(pastData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAssignments();
  }, [courseId]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  const AssignmentSection = ({ title, assignments, expanded, onToggle }) => (
    <div className="bg-white shadow rounded-lg mb-4 w-full">
      <div 
        onClick={onToggle} 
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100 transition"
      >
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {expanded ? <ChevronDown className="text-gray-500" /> : <ChevronRight className="text-gray-500" />}
      </div>
      {expanded && (
        <div className="p-4 border-t">
          {assignments.length > 0 ? (
            assignments.map((assignment, index) => (
              <div 
                key={assignment.id || index} 
                className="flex items-start py-3 border-b last:border-b-0 hover:bg-gray-50 transition"
              >
                <div className="mr-4">
                  {title === 'Upcoming Assignments' 
                    ? <Clock color="blue" />
                    : <CheckCircle color="pink" />}
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-800">{assignment.title}</h3>
                  <div className="text-sm text-gray-600">
                    {assignment.available_date && <span>Available {formatDate(assignment.available_date)} | </span>}
                    Due {formatDate(assignment.due_date)}
                    {assignment.points && <span> | {assignment.points} pts</span>}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No assignments available.</p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <div className="flex items-center mb-6">
        <BookOpen className="mr-3 text-pink-600" size={32} />
        <h1 className="text-2xl font-bold text-gray-800">Assignments for Course {courseId}</h1>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <AssignmentSection 
        title="Upcoming Assignments" 
        assignments={upcomingAssignments}
        expanded={expandUpcoming}
        onToggle={() => setExpandUpcoming(!expandUpcoming)}
      />

      <AssignmentSection 
        title="Past Assignments" 
        assignments={pastAssignments}
        expanded={expandPast}
        onToggle={() => setExpandPast(!expandPast)}
      />
    </div>
  );
};

export default CourseAssignments;
