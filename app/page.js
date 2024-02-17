"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Loader from "./ui/loader/Loader";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard");
  });
  return (
    <div className="loadingPage">
      <Loader />
    </div>
  );
}
