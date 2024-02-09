"use client";

import { useRouter } from "next/navigation";
import secureLocalStorage from "react-secure-storage";
import styles from "./loginForm.module.css";

const LoginForm = () => {
  const router = useRouter();

  const login = () => {
    const user = {
      id: 123,
      username: 'user',
      email: 'user@example.com',
      // Other user-related information
    };

    // Convert the user object to a JSON string
    const userJSON = JSON.stringify(user);
    secureLocalStorage.setItem('user', userJSON);
    router.push('/dashboard');
  }

  return (
    <form className={styles.form} onSubmit={(e) => { e.preventDefault(); login(); }}>
      <h1>Login</h1>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
