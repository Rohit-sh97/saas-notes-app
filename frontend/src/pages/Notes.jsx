import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [plan, setPlan] = useState("free");

  const fetchNotes = async () => {
    const res = await API.get("/notes");
    setNotes(res.data);
  };

  const createNote = async () => {
    try {
      await API.post("/notes", { title, content });
      setTitle("");
      setContent("");
      fetchNotes();
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  const deleteNote = async (id) => {
    await API.delete(`/notes/${id}`);
    fetchNotes();
  };

  const upgradePlan = async () => {
    const token = localStorage.getItem("token");
    const { tenantSlug } = JSON.parse(atob(token.split(".")[1]));
    await API.post(`/tenants/${tenantSlug}/upgrade`);
    setPlan("pro");
    alert("Upgraded to Pro!");
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
    
      <h2>Notes</h2>
      <div>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <input value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
        <button onClick={createNote}>Add</button>
      </div>
      <ul>
        {notes.map((n) => (
          <li key={n._id}>
            {n.title} - {n.content}
            <button onClick={() => deleteNote(n._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleLogout}>Logout</button>

      {notes.length >= 3 && plan === "free" && (
        <div>
          <p>You reached Free Plan limit.</p>
          <button onClick={upgradePlan}>Upgrade to Pro</button>
        </div>
      )}
    </div>
  );
}
