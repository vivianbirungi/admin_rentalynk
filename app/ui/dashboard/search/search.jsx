import { MdSearch } from "react-icons/md";
import styles from "./search.module.css";

const Search = ({ placeholder, onSearch }) => {
  return (
    <div className={styles.container}>
      <MdSearch fill="" />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
