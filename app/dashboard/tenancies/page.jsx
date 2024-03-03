"use client";
import { useEffect, useState } from "react";
import TimeAgo from "react-timeago";
import useRLStore from "../../lib/store";
import Search from "../../ui/dashboard/search/search";
import styles from "../../ui/dashboard/tenancies/tenancies.module.css";

const page = () => {
  const { tenancies, getTenancies } = useRLStore((state) => state);
  const [isUserSearching, setUserSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getTenancies();
  }, []);
  const tenancyData = isUserSearching ? searchResults : tenancies;
  const handleSearch = (searchQuery) => {
    // Filter the data based on the search query
    if (searchQuery !== "") setUserSearching(true);
    const filteredResults = tenancies?.filter(
      (item) =>
        item.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.pro_title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div>
          <Search placeholder="Search " onSearch={handleSearch} />
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td className="">Property</td>
            <td className="">Contract</td>
            <td className="hidden">Status</td>
          </tr>
        </thead>
        <tbody>
          {tenancyData?.map((tenancy) => (
            <tr key={tenancy.tenancy_id}>
              <td>
                <div className={styles.user}>{tenancy?.full_name}</div>
              </td>
              <td className="">{tenancy?.pro_title}</td>
              <td className="">
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
                {tenancy?.is_terminated === "yes" ? "Active" : "Terminated"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default page;
