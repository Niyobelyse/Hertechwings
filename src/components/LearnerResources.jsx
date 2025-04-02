import { useEffect, useState } from "react";
import axios from "axios";

export default function LearnerResources() {
  const [resources, setResources] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/course-resources/");
      setResources(response.data);
    } catch (err) {
      setError("Failed to fetch resources");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Course Resources</h1>
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-4">
        {resources.length === 0 ? (
          <p>No resources available.</p>
        ) : (
          resources.map((resource) => (
            <li key={resource.id} className="p-4 border rounded-lg shadow-md">
              <div>
                <h2 className="text-xl font-semibold">{resource.title}</h2>
                <p className="text-gray-600">Type: {resource.resource_type}</p>
                {resource.resource_type === "link" && resource.url && (
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 underline"
                  >
                    View Resource
                  </a>
                )}
                {resource.resource_type === "file" && resource.file && (
                  <a
                    href={resource.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 underline"
                  >
                    View File
                  </a>
                )}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
