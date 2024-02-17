"use client";

import { useRouter } from "next/navigation";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
import styles from "./loginForm.module.css";
import { useState } from "react";
import { login_user_api } from "@/app/lib/auth";
import Loader from "../../loader/Loader";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      setLoading(true);
      const payload = { email, password };
      const result = await login_user_api(payload);
      if (result.flag) {
        secureLocalStorage.setItem("user", result.user);
        router.push("/dashboard");
      } else {
        toast.error("Email or password is wrong.");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.form}>
      <h1>Rentalynk Admin</h1>
      <input
        type="text"
        placeholder="email"
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      {loading ? <Loader /> : <button onClick={login}> Login</button>}
    </div>
  );
};

export default LoginForm;
