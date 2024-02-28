import { useState } from "react";
import styles from "./addNotification.module.css";
const AddNotification = () => {
  const [type, setType] = useState("landlord");
  const [message, setMessage] = useState("");
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

        <button className={styles.button} type="submit">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default AddNotification;
