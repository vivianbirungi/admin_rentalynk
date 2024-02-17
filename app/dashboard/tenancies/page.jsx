"use client";
import useRLStore from "@/app/lib/store";
import Card from "@/app/ui/dashboard/tenancies/card";
import styles from "../../ui/dashboard/tenancies/tenancies.module.css";
const page = () => {
  const { tenants } = useRLStore((state) => state);
  return (
    <div className={styles.container}>
      {tenants?.results?.map((tenant) => (
        <div className={styles.single}>
          <Card data={tenant} />
        </div>
      ))}
    </div>
  );
};

export default page;
