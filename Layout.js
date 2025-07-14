
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between">
          <h1 className="font-bold">Notes & Bookmarks</h1>
          <div className="space-x-4">
            <Link href="/notes" className="hover:underline">Notes</Link>
            <Link href="/bookmarks" className="hover:underline">Bookmarks</Link>
          </div>
        </div>
      </nav>
      <main className="flex-1 container mx-auto p-4">{children}</main>
    </div>
  );
}
