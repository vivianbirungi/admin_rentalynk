"use client"
import useRLStore from "@/app/lib/store";
import { useEffect } from "react";
import styles from "../../ui/dashboard/bookings/bookings.module.css";
const page = () => {
  const {bookings, getBookings, setBooking} = useRLStore(state => state);
   console.log(bookings)
  useEffect(() => {
    getBookings();
  }, []);
  return (
    <div>
       <div className={styles.propertyContainer}>
        <h4>Properties</h4>
        <table className={styles.table}>
      
      <tbody>
     {bookings.map(booking =>(<><tr className={styles.hr}>
      {booking.images && (
      <td>
        <img
          src={`https://api.rentalynk.com/properties/${booking?.property_id}/${booking.images.split(',')[0].trim()}`}  // Display only the first image
          alt={`First Image`}
          width={40}
          height={40}
          className={styles.propertyImage}
        />
      </td>
    )}
              <td>{booking?.pro_title}<br/><span className={styles.muted_text}>{booking?.total_units} units </span></td>
              <td>{booking?.booked_date}</td>
              <td className={styles[booking?.booking_status]}>{booking?.booking_status}</td>
              <td><button className={styles.button}>Action</button></td>

      </tr>
     </>))}
    
        </tbody>
      </table>
      {/* <Pagination arrayLength={bookings.length}
          currentPage={currentPage}
          handleClick={handlePagination}
          perpage={10} /> */}
      </div>
    </div>
  )
}

export default page
