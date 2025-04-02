import { useState, useEffect } from "react";

export default function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ id: null, title: "", description: "", image: null });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const response = await fetch("https://belyse.pythonanywhere.com//courses/");
    const data = await response.json();
    setCourses(data);
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (form.image) formData.append("image", form.image);

    if (editing) {
      await fetch(`https://belyse.pythonanywhere.com//courses/${form.id}/`, {
        method: "PUT",
        body: formData,
      });
    } else {
      await fetch("https://belyse.pythonanywhere.com//courses/", {
        method: "POST",
        body: formData,
      });
    }

    fetchCourses();
    setForm({ id: null, title: "", description: "", image: null });
    setEditing(false);
  };

  const handleEdit = (course) => {
    setForm({ id: course.id, title: course.title, description: course.description, image: null });
    setEditing(true);
  };

  const handleDelete = async (id) => {
    await fetch(`https://belyse.pythonanywhere.com//courses/${id}/`, {
      method: "DELETE",
    });
    fetchCourses();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <div style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "5px" }}>
        <h2>{editing ? "Edit Course" : "Register Course"}</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required style={{ padding: "8px", border: "2px solid #ccc", borderRadius: "5px", outline: "none", ring: "2px ring-blue-500" }} />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required style={{ padding: "8px", border: "2px solid #ccc", borderRadius: "5px", outline: "none", ring: "2px ring-blue-500" }} />
          <input type="file" name="image" onChange={handleChange} style={{ padding: "8px", border: "2px solid #ccc", borderRadius: "5px", outline: "none", ring: "2px ring-blue-500" }} />
          <button type="submit" className="bg-pink-500" style={{  color: "white", padding: "10px", borderRadius: "5px", fontWeight: "bold" }}>{editing ? "Update Course" : "Submit"}</button>
        </form>
      </div>

      <div style={{ padding: "15px", border: "1px solid #ccc", borderRadius: "5px" }}>
        <h2>Course Management</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Image</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Title</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Description</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <img src={course.image} alt={course.title} style={{ width: "50px", height: "50px" }} />
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{course.title}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{course.description}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px", display: "flex", gap: "5px" }}>
                  <button onClick={() => handleEdit(course)} style={{ color: "white", padding: "5px", borderRadius: "5px" }} className="bg-pink-500">Edit</button>
                  <button onClick={() => handleDelete(course.id)} style={{ backgroundColor: "red", color: "white", padding: "5px", borderRadius: "5px" }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}