"use client";
import useRLStore from "@/app/lib/store";
import { useEffect } from "react";
import Timeago from "react-timeago";
import styles from "../../ui/dashboard/bookings/bookings.module.css";
const page = () => {
  const { bookings, getBookings, setBooking } = useRLStore((state) => state);
  console.log(bookings);
  useEffect(() => {
    getBookings();
  }, []);
  return (
    <div>
      <div className={styles.propertyContainer}>
        <table>
          <thead>
            <tr>
              <td>Tenancy</td>
              <td className="hidden">Payment</td>
              <td className="hidden">Message</td>
              <td className="hidden">Booking</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <>
                <tr className={styles.hr}>
                  <td>
                    {booking.full_name}
                    <br />
                    <span className={styles.muted_text}>
                      {booking?.pro_title}
                    </span>
                  </td>
                  <td>
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

                  <td>
                    <button className={styles.button}>Action</button>
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
