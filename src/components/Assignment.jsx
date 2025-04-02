import React, { useState, useEffect } from "react";
import { BookOpen, Clock, CheckCircle, ChevronDown, ChevronRight, Search } from "lucide-react";

const AssignmentTracker = () => {
  const [assignments, setAssignments] = useState([]);
  const [upcomingAssignments, setUpcomingAssignments] = useState([]);
  const [pastAssignments, setPastAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandUpcoming, setExpandUpcoming] = useState(true);
  const [expandPast, setExpandPast] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assignmentsResponse = await fetch("https://belyse.pythonanywhere.com//assignments/");
        const coursesResponse = await fetch("https://belyse.pythonanywhere.com//courses/");

        if (!assignmentsResponse.ok || !coursesResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const assignmentsData = await assignmentsResponse.json();
        const coursesData = await coursesResponse.json();

        // Log for debugging if courses data is not loading correctly
        console.log("Courses Data: ", coursesData);

        setAssignments(assignmentsData);
        setCourses(coursesData);

        // Categorize assignments by due_date
        const currentDate = new Date();
        setUpcomingAssignments(assignmentsData.filter(a => new Date(a.due_date) >= currentDate));
        setPastAssignments(assignmentsData.filter(a => new Date(a.due_date) < currentDate));
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => (dateString ? new Date(dateString).toLocaleString() : "N/A");

  const filterAssignments = (assignmentsList) => {
    return assignmentsList.filter((assignment) => {
      const matchesCourse = selectedCourse === "all" || Number(assignment.course_id) === Number(selectedCourse);
      const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCourse && matchesSearch;
    });
  };

  const AssignmentSection = ({ title, assignments, expanded, onToggle }) => (
    <div className="bg-white shadow rounded-lg mb-4 w-full">
      <div onClick={onToggle} className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100 transition">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {expanded ? <ChevronDown className="text-gray-500" /> : <ChevronRight className="text-gray-500" />}
      </div>
      {expanded && (
        <div className="p-4 border-t">
          {assignments.length > 0 ? (
            assignments.map((assignment) => (
              <div key={assignment.id} className="flex items-start py-3 border-b last:border-b-0 hover:bg-gray-50 transition">
                <div className="mr-4">{title === "Upcoming Assignments" ? <Clock color="pink" /> : <CheckCircle color="pink" />}</div>
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
        <h1 className="text-2xl font-bold text-gray-800">Assignments</h1>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Search & Filter Section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative flex-grow">
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2 pl-10 focus:ring-2 focus:ring-pink-500"
            placeholder="Search assignments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2 text-gray-500" size={18} />
        </div>

        {/* Course Filter Dropdown */}
        <select
          className="border border-gray-300 rounded-lg p-2 bg-white"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="all">All Courses</option>
          {courses.length > 0 ? (
            courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))
          ) : (
            <option disabled>No courses available</option>
          )}
        </select>
      </div>

      {/* Assignment Sections */}
      <AssignmentSection
        title="Upcoming Assignments"
        assignments={filterAssignments(upcomingAssignments)}
        expanded={expandUpcoming}
        onToggle={() => setExpandUpcoming(!expandUpcoming)}
      />

      <AssignmentSection
        title="Past Assignments"
        assignments={filterAssignments(pastAssignments)}
        expanded={expandPast}
        onToggle={() => setExpandPast(!expandPast)}
      />
    </div>
  );
};

export default AssignmentTracker;
