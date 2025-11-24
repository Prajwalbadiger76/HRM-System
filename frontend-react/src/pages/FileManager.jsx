import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

const FileManager = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchFiles = async () => {
    try {
      const res = await API.get("/files");
      setFiles(res.data);
    } catch (error) {
      console.log("FETCH FILES ERROR:", error.response?.data);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Choose a file");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await API.post("/files", formData, { headers: { "Content-Type": "multipart/form-data" } });
      fetchFiles();
      setSelectedFile(null);
    } catch (error) {
      alert("Upload failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/files/${id}`);
      fetchFiles();
    } catch (error) {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">File Manager</h1>

        <div className="flex gap-3 mb-4">
          <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
          <button className="bg-blue-600 px-4 py-2 rounded text-white" onClick={handleUpload}>Upload</button>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">File Name</th>
              <th className="p-2 border">Uploaded By</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file._id}>
                <td className="p-2 border">{file.fileName}</td>
                <td className="p-2 border">{file.uploadedBy?.email}</td>
                <td className="p-2 border">
                  <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleDelete(file._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default FileManager;
