"use client";
import { useEffect, useState } from "react";
import Timeago from "react-timeago";
import useRLStore from "../../lib/store";
import styles from "../../ui/dashboard/bookings/bookings.module.css";
import Search from "../../ui/dashboard/search/search";
const page = () => {
  const { bookings, getBookings, setBooking } = useRLStore((state) => state);
  const [searchResults, setSearchResults] = useState([]);
  const [isUserSearching, setUserSearching] = useState(false);
  useEffect(() => {
    getBookings();
  }, []);
  const bookingData = isUserSearching ? searchResults : bookings;
  const handleSearch = (searchQuery) => {
    // Filter the data based on the search query
    if (searchQuery !== "") setUserSearching(true);
    const filteredResults = bookings?.filter(
      (item) =>
        item.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.pro_title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  };
  return (
    <div>
      <div className={styles.propertyContainer}>
        <div className={styles.top}>
          <div>
            <Search placeholder="Search " onSearch={handleSearch} />
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <td>Tenancy</td>
              <td className="hidden">Payment</td>
              <td className="hidden">Message</td>
              <td className="hidden">Booking</td>
            </tr>
          </thead>
          <tbody>
            {bookingData.map((booking) => (
              <>
                <tr className={styles.hr}>
                  <td>
                    {booking.full_name}
                    <br />
                    <span className={styles.muted_text}>
                      {booking?.pro_title}
                    </span>
                  </td>
                  <td className="hidden">
                    <span>{booking?.brokerage_fees}</span>
                    <br />
                    <small>{booking?.paid_status}</small>
                  </td>
                  <td className="tooltip-cell" data-tooltip={booking?.message}>
                    <span className="ellipsis">{booking?.message}</span>
                    <br />
                  </td>
                  <td>
                    <span className={styles[booking?.booking_status]}>
                      {booking?.booking_status}
                    </span>
                    <br />
                    <small>
                      <Timeago date={booking?.booked_date} />
                    </small>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
        {/* <Pagination arrayLength={bookings.length}
          currentPage={currentPage}
          handleClick={handlePagination}
          perpage={10} /> */}
      </div>
    </div>
  );
};

export default page;
