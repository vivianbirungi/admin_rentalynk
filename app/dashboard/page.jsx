"use client";
import { useEffect } from "react";
import useRLStore from "../lib/store";
import Card from "../ui/dashboard/card/card";
import styles from "../ui/dashboard/dashboard.module.css";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Transaction from "../ui/dashboard/transaction/transaction";

const Dashboard = () => {
  const {
    landLords,
    tenants,
    properties,
    tenancies,
    getTenants,
    getLandlords,
    getSubscriptions,
    getProperties,
    getTenancies,
  } = useRLStore((state) => state);

  useEffect(() => {
    getTenants();
    getLandlords();
    getSubscriptions();
    getProperties();
    getTenancies();
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card
            title="Users"
            numbers={landLords?.results?.length}
            tenants={tenants?.results?.length}
          />
          <Card title="Properties" numbers={properties?.length} />
          <Card title="Tenancies" numbers={tenancies?.length} />
        </div>
        <Transaction />
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;
