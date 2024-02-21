"use client";
import { useEffect } from "react";
import TimeAgo from "react-timeago";
import useRLStore from "../../lib/store";
import Pagination from "../../ui/dashboard/pagination/pagination";
import Search from "../../ui/dashboard/search/search";
import styles from "../../ui/dashboard/users/users.module.css";

const SubscriptionPage = () => {
  const { getSubscriptions, subscriptions } = useRLStore((state) => state);

  console.log(subscriptions);

  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search
          placeholder="Search for a subscription..."
          onSearch={() => null}
        />
      </div>
      <br />
      <table className={styles.table}>
        <thead>
          <tr>
            <td className="hidden bold">Property</td>
            <td className="hidden">Txt Ref</td>
            <td className="hidden">Tenants</td>
            <td className="hidden">Amount</td>
            <td className="hidden">Payment Status</td>
            <td className="hidden">Date paid</td>
          </tr>
        </thead>
        <tbody>
          {subscriptions?.map((subscription) => (
            <tr>
              <td className="hidden">{subscription.pro_title}</td>
              <td className="hidden">{subscription.tx_ref}</td>
              <td className="hidden">{subscription.total_tenants}</td>
              <td className="hidden">{subscription.amount} Ugx</td>
              <td className="hidden">{subscription.payment_status}</td>
              <td className="hidden">
                <TimeAgo date={subscription?.date_paid} />
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
