
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [query, setQuery] = useState("");

  const fetchNotes = async () => {
    const res = await axios.get(`http://localhost:5000/api/notes?q=${query}`);
    setNotes(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/notes", {
      title, content, tags: tags.split(",").map(t => t.trim())
    });
    setTitle(""); setContent(""); setTags("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/api/notes/${id}`);
    fetchNotes();
  };

  useEffect(() => { fetchNotes(); }, [query]);

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Notes</h2>
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input className="border p-2 w-full" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea className="border p-2 w-full" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
        <input className="border p-2 w-full" placeholder="Tags (comma-separated)" value={tags} onChange={e => setTags(e.target.value)} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Note</button>
      </form>
      <input className="border p-2 w-full mb-4" placeholder="Search notes..." value={query} onChange={e => setQuery(e.target.value)} />
      <div className="grid gap-4">
        {notes.map(note => (
          <div key={note._id} className="p-4 border rounded shadow">
            <h3 className="font-bold">{note.title}</h3>
            <p>{note.content}</p>
            <p className="text-sm text-gray-600">Tags: {note.tags.join(", ")}</p>
            <button onClick={() => deleteNote(note._id)} className="text-red-600 mt-2">Delete</button>
          </div>
        ))}
      </div>
    </Layout>
  );
}
