
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [query, setQuery] = useState("");

  const fetchBookmarks = async () => {
    const res = await axios.get(`http://localhost:5000/api/bookmarks?q=${query}`);
    setBookmarks(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/bookmarks", {
      url, title, description, tags: tags.split(",").map(t => t.trim())
    });
    setUrl(""); setTitle(""); setDescription(""); setTags("");
    fetchBookmarks();
  };

  const deleteBookmark = async (id) => {
    await axios.delete(`http://localhost:5000/api/bookmarks/${id}`);
    fetchBookmarks();
  };

  useEffect(() => { fetchBookmarks(); }, [query]);

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Bookmarks</h2>
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input className="border p-2 w-full" placeholder="URL" value={url} onChange={e => setUrl(e.target.value)} required />
        <input className="border p-2 w-full" placeholder="Title (optional)" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea className="border p-2 w-full" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <input className="border p-2 w-full" placeholder="Tags (comma-separated)" value={tags} onChange={e => setTags(e.target.value)} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Bookmark</button>
      </form>
      <input className="border p-2 w-full mb-4" placeholder="Search bookmarks..." value={query} onChange={e => setQuery(e.target.value)} />
      <div className="grid gap-4">
        {bookmarks.map(bookmark => (
          <div key={bookmark._id} className="p-4 border rounded shadow">
            <a href={bookmark.url} className="font-bold text-blue-700" target="_blank">{bookmark.title}</a>
            <p>{bookmark.description}</p>
            <p className="text-sm text-gray-600">Tags: {bookmark.tags.join(", ")}</p>
            <button onClick={() => deleteBookmark(bookmark._id)} className="text-red-600 mt-2">Delete</button>
          </div>
        ))}
      </div>
    </Layout>
  );
}
