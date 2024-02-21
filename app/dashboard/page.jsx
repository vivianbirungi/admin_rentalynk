"use client";
import { useEffect } from "react";
import useRLStore from "../lib/store";
import Cards from "../ui/dashboard/card/cards";
import styles from "../ui/dashboard/dashboard.module.css";
import Transaction from "../ui/dashboard/transaction/transaction";

const Dashboard = () => {
  const {
    getTenants,
    getLandlords,
    getSubscriptions,
    getProperties,
    getTenancies,
    getSearchesMade,
  } = useRLStore((state) => state);

  useEffect(() => {
    getTenants();
    getLandlords();
    getSubscriptions();
    getProperties();
    getTenancies();
    getSearchesMade();
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <Cards />
        <Transaction />
      </div>
    </div>
  );
};

export default Dashboard;
