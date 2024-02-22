"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
function AuthGuard({ children }) {
  const router = useRouter();
  const user = secureLocalStorage.getItem("user");
  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [router]);

  return <>{children}</>;
}
export default AuthGuard;
