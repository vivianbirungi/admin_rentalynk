import { MdHomeWork, MdSupervisedUserCircle } from "react-icons/md";
import { useMemo } from "react";
import moment from "moment";
import styles from "./card.module.css";
import useRLStore from "../../../lib/store";

const Cards = () => {
  const { landLords, tenants, properties, tenancies, bookings } = useRLStore(
    (state) => state
  );


  const ListedProperties = useMemo(() => {
    return properties.filter((val) => val.deleted === "N");
  }, []);

  const notListedProperties = useMemo(() => {
    return properties.filter((val) => val.deleted === "Y");
  }, []);

  const activeTenancies = useMemo(() => {
    return tenancies.filter(
      (val) => val.is_terminated == "no" || val.is_terminated == ""
    );
  }, []);

  const pendingBookings = useMemo(() => {
    return bookings.filter((val) => val.booking_status === "pending");
  }, []);

  const approvedBookings = useMemo(() => {
    return bookings.filter((val) => val.booking_status === "approved");
  }, []);

  return (
    <div className={styles.cardsBox}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <small>Users</small>
          <MdSupervisedUserCircle size={30} />
        </div>
        <div className={styles.cardFooter}>
          <div>
            <h2>{tenants?.results?.length}</h2>
            <small>Tenants</small>
          </div>
          <div>
            <h2>{landLords?.results?.length}</h2>
            <small>Landlord</small>
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <small>Properties</small>
          <MdHomeWork size={30} />
        </div>
        <div className={styles.cardFooter}>
          <div>
            <h2>{ListedProperties?.length}</h2>
            <small>Listed Properties</small>
          </div>
          <div>
            <h2>{notListedProperties?.length}</h2>
            <small>Not Listed</small>
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <small>Bookings</small>
          <MdSupervisedUserCircle size={30} />
        </div>
        <div className={styles.cardFooter}>
          <div>
            <h2>{pendingBookings?.length}</h2>
            <small>Pending</small>
          </div>
          <div>
            <h2>{approvedBookings?.length}</h2>
            <small>Approved</small>
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <small>Active Tenancies</small>
          <MdSupervisedUserCircle size={30} />
        </div>
        <div className={styles.cardFooter}>
          <div>
            <h2>{activeTenancies?.length}</h2>
            <small>Active</small>
          </div>
          <div>
            <h2>{tenancies?.length}</h2>
            <small>OverAll</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
