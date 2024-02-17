import { MdHomeWork, MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";
const Card = ({ title, numbers, tenants }) => {
  return (
    <>
      {title == "Users" ? (
        <div className={styles.container}>
          <div className={styles.texts}>
            <MdSupervisedUserCircle size={24} />

            <span className={styles.title}>
              <b>{title}</b>
            </span>
          </div>
          <div className={styles.users}>
            <div className={styles.landlordflex}>
              <span className={styles.number}>{numbers}</span>
              <span className={styles.landlords}>LandLords</span>
            </div>
            <div className={styles.tenantsflex}>
              <span className={styles.number}>{tenants}</span>
              <span className={styles.tenants}>Tenants</span>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.texts}>
            {title == "Properties" ? (
              <MdHomeWork size={24} />
            ) : (
              <MdSupervisedUserCircle size={24} />
            )}
            <span className={styles.title}>
              <b>{title}</b>
            </span>{" "}
            <br />
          </div>
          <span className={styles.number}>{numbers}</span>
          <small className={styles.detail}> this month</small>
        </div>
      )}
    </>
  );
};

export default Card;
