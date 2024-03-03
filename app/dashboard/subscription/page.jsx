"use client";
import { useEffect, useState } from "react";
import TimeAgo from "react-timeago";
import useRLStore from "../../lib/store";
import Pagination from "../../ui/dashboard/pagination/pagination";
import Search from "../../ui/dashboard/search/search";
import styles from "../../ui/dashboard/users/users.module.css";

const SubscriptionPage = () => {
  const { getSubscriptions, subscriptions } = useRLStore((state) => state);
  const [searchResults, setSearchResults] = useState([]);
  const [isUserSearching, setUserSearching] = useState(false);
  useEffect(() => {
    getSubscriptions();
  }, []);
  const subdata = isUserSearching ? searchResults : subscriptions;

  const handleSearch = (searchQuery) => {
    // Filter the data based on the search query
    if (searchQuery !== "") setUserSearching(true);
    const filteredResults = subscriptions?.filter(
      (item) =>
        item.pro_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tx_ref.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(filteredResults);
    console.log("After update:", searchResults);
  };
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div></div>
        <div>
          <Search placeholder="Search" onSearch={handleSearch} />
        </div>
      </div>
      <br />
      <table className={styles.table}>
        <thead>
          <tr>
            <td className=" bold">Property</td>
            <td className="">Txt Ref</td>
            <td className="hidden">Tenants</td>
            <td className="">Amount</td>
            <td className="">Payment Status</td>
            <td className="hidden">Date paid</td>
          </tr>
        </thead>
        <tbody>
          {subdata?.map((subscription) => (
            <tr>
              <td className="">{subscription.pro_title}</td>
              <td className="">{subscription.tx_ref}</td>
              <td className="hidden">{subscription.total_tenants}</td>
              <td className="">{subscription.amount} Ugx</td>
              <td className="">{subscription.payment_status}</td>
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
