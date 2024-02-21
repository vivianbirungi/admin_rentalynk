"use client";
import TimeAgo from "react-timeago";
import useRLStore from "../../../lib/store";
import styles from "./transaction.module.css";
const Transaction = () => {
  const { properties, subscriptions, searchesMade, bookings } = useRLStore(
    (state) => state
  );
  const latest_properties = properties.slice(-4);
  const latest_subscription = subscriptions.slice(-3);
  return (
    <div className={styles.gridList}>
      {latest_subscription.length > 0 && (
        <div className={styles.container}>
          <h2 className={styles.title}>Latest Transactions</h2>
          <table>
            <thead>
              <tr>
                <td className="hidden bold">Property</td>
                <td className="hidden">Amount</td>
                <td className="hidden">Date</td>
              </tr>
            </thead>
            <tbody>
              {latest_subscription?.map((subscription) => (
                <tr>
                  <td className="hidden">{subscription.pro_title}</td>
                  <td className="hidden">{subscription.tx_ref}</td>

                  <td className="hidden">{subscription.amount} Ugx</td>
                  <td className={`hidden`}>
                    <small>
                      <TimeAgo date={subscription.date_paid} />
                    </small>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.cardHeading}>
          <h2 className={styles.title}>Latest Properties</h2>
        </div>
        <table>
          <tbody>
            {latest_properties.map((myProperty) => (
              <>
                <tr className={styles.hr}>
                  {myProperty.images && (
                    <td>
                      <img
                        src={`https://api.rentalynk.com/properties/${
                          myProperty.property_id
                        }/${myProperty.images.split(",")[0].trim()}`} // Display only the first image
                        alt={`First Image`}
                        width={40}
                        height={40}
                        className={styles.userImage}
                      />
                    </td>
                  )}
                  <td>
                    {myProperty?.pro_title}
                    <br />
                    <span className={styles.muted_text}>
                      {myProperty?.total_units} units{" "}
                    </span>
                  </td>
                  <td>
                    <TimeAgo date={myProperty?.created_at} />
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>

      {searchesMade.length > 0 && (
        <div className={styles.container}>
          <div className={styles.cardHeading}>
            <h2 className={styles.title}>Top 5 searches</h2>
          </div>
          <table>
            <thead>
              <tr>
                <td className="hidden bold">Property Type</td>
                <td className="hidden">Location</td>
                <td className="hidden">Amount</td>
              </tr>
            </thead>
            <tbody>
              {searchesMade?.map((search) => (
                <tr>
                  <td className="hidden">{search.pro_type}</td>
                  <td className="hidden">{search.location}</td>
                  <td className="hidden">{search.rent_fees} Ugx</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {bookings && (
        <div className={styles.container}>
          <div className={styles.cardHeading}>
            <h2 className={styles.title}>Latest Bookings</h2>
          </div>
          <table>
            <tbody>
              {bookings.map((booking) => (
                <>
                  <tr className={styles.hr}>
                    {bookings.images && (
                      <td>
                        <img
                          src={`https://api.rentalynk.com/properties/${
                            myProperty.property_id
                          }/${booking.images.split(",")[0].trim()}`} // Display only the first image
                          alt={`First Image`}
                          width={40}
                          height={40}
                          className={styles.userImage}
                        />
                      </td>
                    )}
                    <td>
                      <small className={styles.muted_text}>
                        {booking?.full_name}
                      </small>
                      <br />
                      <b>{booking?.pro_title}</b>
                      <br />
                      <small className={styles.muted_text}>
                        {booking?.message}
                      </small>
                    </td>
                    <td>
                      <small className={styles.muted_text}>
                        <b>{booking?.booking_status}</b>
                      </small>
                      <br />
                      <small>
                        <TimeAgo date={booking?.created_at} />
                      </small>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transaction;
