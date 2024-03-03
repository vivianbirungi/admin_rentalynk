"use client";
import { useEffect } from "react";
import TimeAgo from "react-timeago";
import useRLStore from "../../lib/store";
import Pagination from "../../ui/dashboard/pagination/pagination";
import styles from "../../ui/dashboard/users/users.module.css";

const SubscriptionPage = () => {
  const { searchesMade, getSearchesMade } = useRLStore((state) => state);

  useEffect(() => {
    getSearchesMade();
  }, []);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td className="hidden">Property Type</td>
            <td className="hidden">Bathrooms</td>
            <td className="hidden">Bedrooms</td>
            <td className="hidden">Rent fees</td>
            <td className="hidden">Location</td>
            <td className="hidden">full_name</td>
            <td className="hidden bold">Date</td>
          </tr>
        </thead>
        <tbody>
          {searchesMade
            .filter((val) => val.user_id !== "18")
            ?.map((search) => (
              <tr>
                <td className="hidden">{search.pro_type||"N/A"}</td>
                <td className="hidden">{search.bathrooms||0}</td>
                <td className="hidden">{search.bedrooms||0}</td>
                <td className="hidden"><b><small>{search.rent_fees} UGX</small></b></td>
                <td className="hidden">{search.location||'N/A'}</td>
                <td className="hidden">{search.full_name}</td>
                <td className="hidden">
                  <TimeAgo date={search.created_at}></TimeAgo>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default SubscriptionPage;
