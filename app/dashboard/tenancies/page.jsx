"use client";
import useRLStore from "@/app/lib/store";
import { useEffect } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import TimeAgo from "react-timeago";
import styles from "../../ui/dashboard/tenancies/tenancies.module.css";
const page = () => {
  const { tenancies, getTenancies } = useRLStore((state) => state);
  useEffect(() => {
    getTenancies();
  }, []);
  //on reload data

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td className="hidden">Property</td>
            <td className="hidden">Contract</td>
            <td className="hidden">Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {tenancies?.map((tenancy) => (
            <tr key={tenancy.tenancy_id}>
              <td>
                <div className={styles.user}>{tenancy?.full_name}</div>
              </td>
              <td className="hidden">{tenancy?.pro_title}</td>
              <td className="hidden">
                {tenancy?.has_signed == "Y" ? (
                  <>
                    <span> Signed</span>
                    <br />
                    <small>
                      (
                      <TimeAgo date={tenancy?.date_signed} />)
                    </small>
                  </>
                ) : (
                  <span>Pending</span>
                )}
              </td>
              <td className="hidden">
                {tenancy?.subscription_active ? "Active" : "NO"}
              </td>
              <td>
                <div className={styles.buttons}>
                  <button
                    className={`${styles.button} ${styles.view}`}
                    onClick={() => handleViewUser(user.user_id, user.user_type)}
                  >
                    <MdOutlineRemoveRedEye size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default page;
