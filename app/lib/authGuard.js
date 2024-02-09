'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
 function AuthGuard({ children }) {
  const router = useRouter();
const user = secureLocalStorage.getItem('user');
useEffect(() => {


  if (!user) {
    router.replace('/login');
  }
}, [router]);

return <>{children}</>;
  
/* otherwise don't return anything, will do a redirect from useEffect */
 
}
export default AuthGuard;