"use client";
import useRLStore from "@/app/lib/store";
import { notify_user } from "@/app/lib/users";
import Loader from "@/app/ui/loader/Loader";
import { useState } from "react";
import styles from "./addNotification.module.css";

const AddNotification = () => {
  const [type, setType] = useState("landlord");
  const [message, setMessage] = useState("");
  const { activeUser } = useRLStore((state) => state);
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");

  const send_message = async () => {
    try {
      setLoading(true);
      const payload = {
        one_signal_id: activeUser.one_signal_id,
        subject: subject,
        message: message,
        phone: `${activeUser.country_code}${activeUser.phone}`,
        email: activeUser.email,
        full_name: activeUser.full_name,
      };
      const result = await notify_user(payload);
      console.log({ result });
      if (result.flag) {
        router.push("/dashboard");
      } else {
        toast.error("Email or password is wrong.");
      }
      setLoading(false);
    } catch (error) {}
  };
  return (
    <div className={styles.container}>
      <div>
        <span className={styles.header}>Create Post</span>
      </div>
      <form className={styles.formContainer}>
        <div class={styles.form_field}>
          <label for="name" class={styles.form_label}>
            Subject
          </label>
          <input
            type="input"
            class={styles.inputField}
            placeholder=""
            name="name"
            id="name"
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <label for="name" class={styles.form_label}>
          Message
        </label>
        <textarea
          className={styles.message}
          value={message}
          placeholder="Write a text"
          onChange={(e) => setMessage(e.target.value)}
          rows={10} // Adjust the number of rows as needed
        />

        {loading ? (
          <Loader />
        ) : (
          <button className={styles.button} onClick={send_message}>
            {" "}
            Login
          </button>
        )}
      </form>
    </div>
  );
};

export default AddNotification;
