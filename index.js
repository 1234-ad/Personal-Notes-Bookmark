
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  useEffect(() => { router.push("/notes"); }, []);
  return <div className="text-center p-10">Redirecting to /notes...</div>;
}
