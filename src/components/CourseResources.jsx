import { useEffect, useState } from "react";
import axios from "axios";

export default function CourseResources() {
  const [resources, setResources] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [editingResource, setEditingResource] = useState(null);
  const [newResource, setNewResource] = useState({
    course_id: "",
    title: "",
    resource_type: "link",
    url: "",
    file: null,
  });

  useEffect(() => {
    fetchResources();
    fetchCourses();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await axios.get("https://belyse.pythonanywhere.com//course-resources/");
      setResources(response.data);
    } catch (err) {
      setError("Failed to fetch resources");
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get("https://belyse.pythonanywhere.com//courses/");
      setCourses(response.data);
    } catch (err) {
      setError("Failed to fetch courses");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://belyse.pythonanywhere.com//course-resources/${id}/`);
      setResources(resources.filter((resource) => resource.id !== id));
    } catch (err) {
      setError("Failed to delete resource");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("course", newResource.course_id);
    formData.append("title", newResource.title);
    formData.append("resource_type", newResource.resource_type);
    if (newResource.resource_type === "file" && newResource.file) {
      formData.append("file", newResource.file);
    } else {
      formData.append("url", newResource.url);
    }

    try {
      if (editingResource) {
        const response = await axios.put(
          `https://belyse.pythonanywhere.com//course-resources/${editingResource.id}/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setResources(
          resources.map((res) => (res.id === editingResource.id ? response.data : res))
        );
      } else {
        const response = await axios.post("https://belyse.pythonanywhere.com//course-resources/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setResources([...resources, response.data]);
      }
      setNewResource({ title: "", resource_type: "link", url: "", file: null, course_id: "" });
      setEditingResource(null);
    } catch (err) {
      setError("Failed to save resource");
    }
  };

  const handleEdit = (resource) => {
    setEditingResource(resource);
    setNewResource({
      course_id: resource.course,
      title: resource.title,
      resource_type: resource.resource_type,
      url: resource.url || "",
      file: null,
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Course Resources</h1>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6 space-y-4 p-4 border rounded-lg shadow-md">
        <select
          value={newResource.course_id || ""}
          onChange={(e) => setNewResource({ ...newResource, course_id: e.target.value })}
          required
          className="w-full border p-2 rounded-lg"
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Title"
          value={newResource.title}
          onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
          required
          className="w-full border p-2 rounded-lg"
        />
        <select
          value={newResource.resource_type}
          onChange={(e) => setNewResource({ ...newResource, resource_type: e.target.value })}
          className="w-full border p-2 rounded-lg"
        >
          <option value="link">Link</option>
          <option value="file">File</option>
        </select>
        {newResource.resource_type === "link" && (
          <input
            type="text"
            placeholder="URL"
            value={newResource.url}
            onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
            className="w-full border p-2 rounded-lg"
          />
        )}
        {newResource.resource_type === "file" && (
          <input
            type="file"
            onChange={(e) => setNewResource({ ...newResource, file: e.target.files[0] })}
            className="w-full border p-2 rounded-lg"
          />
        )}
        <button type="submit" className="bg-pink-500 text-white p-2 rounded-lg">
          {editingResource ? "Update Resource" : "Add Resource"}
        </button>
      </form>

      <ul className="space-y-4">
        {resources.map((resource) => (
          <li key={resource.id} className="p-4 border rounded-lg shadow-md flex justify-between">
            <div>
              <h2 className="text-xl font-semibold">{resource.title}</h2>
              <p className="text-gray-600">Type: {resource.resource_type}</p>
              {resource.resource_type === "link" && resource.url && (
                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-pink-500 underline">
                  View Resource
                </a>
              )}
              {resource.resource_type === "file" && resource.file && (
                <a href={resource.file} target="_blank" rel="noopener noreferrer" className="text-pink-500 underline">
                  View File
                </a>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(resource)} className="bg-pink-500 text-white px-12 py-2 rounded-lg">
                Edit
              </button>
              <button onClick={() => handleDelete(resource.id)} className="bg-red-500 text-white p-2 rounded-lg">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}