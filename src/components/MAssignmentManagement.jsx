import { useState, useEffect } from "react";

export default function AssignmentManagement() {
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    available_date: "",
    due_date: "",
    points: "",
    course: "",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchAssignments();
    fetchCourses();
  }, []);

  const fetchAssignments = async () => {
    const response = await fetch("http://127.0.0.1:8000/assignments/");
    const data = await response.json();
    setAssignments(data);
  };

  const fetchCourses = async () => {
    const response = await fetch("http://127.0.0.1:8000/courses/");
    const data = await response.json();
    setCourses(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      title: form.title,
      description: form.description,
      available_date: form.available_date,
      due_date: form.due_date,
      points: form.points,
      course: form.course,
    };

    if (editing) {
      await fetch(`http://127.0.0.1:8000/assignments/${form.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
    } else {
      await fetch("http://127.0.0.1:8000/assignments/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
    }

    fetchAssignments();
    setForm({
      id: null,
      title: "",
      description: "",
      available_date: "",
      due_date: "",
      points: "",
      course: "",
    });
    setEditing(false);
  };

  const handleEdit = (assignment) => {
    setForm({
      id: assignment.id,
      title: assignment.title,
      description: assignment.description,
      available_date: assignment.available_date,
      due_date: assignment.due_date,
      points: assignment.points,
      course: assignment.course,
    });
    setEditing(true);
  };

  const handleDelete = async (id) => {
    await fetch(`http://127.0.0.1:8000/assignments/${id}/`, {
      method: "DELETE",
    });
    fetchAssignments();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <div style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "5px" }}>
        <h2>{editing ? "Edit Assignment" : "Add Assignment"}</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
            className="focus:ring-2 focus:ring-pink-500 focus:outline-none p-2 border border-gray-300 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            className="focus:ring-2 focus:ring-pink-500 focus:outline-none p-2 border border-gray-300 rounded"
          />
          <input
            type="datetime-local"
            name="available_date"
            value={form.available_date}
            onChange={handleChange}
            required
            className="focus:ring-2 focus:ring-pink-500 focus:outline-none p-2 border border-gray-300 rounded"
          />
          <input
            type="datetime-local"
            name="due_date"
            value={form.due_date}
            onChange={handleChange}
            required
            className="focus:ring-2 focus:ring-pink-500 focus:outline-none p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="points"
            placeholder="Points"
            value={form.points}
            onChange={handleChange}
            required
            className="focus:ring-2 focus:ring-pink-500 focus:outline-none p-2 border border-gray-300 rounded"
          />
          <select
            name="course"
            value={form.course}
            onChange={handleChange}
            required
            className="focus:ring-2 focus:ring-pink-500 focus:outline-none p-2 border border-gray-300 rounded"
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-pink-500 text-white p-2 rounded font-bold focus:ring-2 focus:ring-pink-500 focus:outline-none"
          >
            {editing ? "Update Assignment" : "Submit"}
          </button>
        </form>
      </div>

      <div style={{ padding: "15px", border: "1px solid #ccc", borderRadius: "5px" }}>
        <h2>Assignments</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Title</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Description</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Available Date</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Due Date</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Points</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Course</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{assignment.title}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{assignment.description}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{assignment.available_date}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{assignment.due_date}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{assignment.points}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {courses.find((course) => course.id === assignment.course)?.title || "N/A"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px", display: "flex", gap: "5px" }}>
                  <button
                    onClick={() => handleEdit(assignment)}
                    className="bg-pink-500 text-white p-2 rounded focus:ring-2 focus:ring-pink-500 focus:outline-none"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(assignment.id)}
                    className="bg-red-500 text-white p-2 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
