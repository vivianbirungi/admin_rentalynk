"use client";
import TimeAgo from "react-timeago";
import useRLStore from "../../../lib/store";
import styles from "./transaction.module.css";
const Transaction = () => {
  const { properties, subscriptions } = useRLStore((state) => state);
  const latest_properties = properties.slice(-4);
  const latest_subscription = subscriptions.slice(-3);
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Latest Transactions</h2>
        <table>
          <thead>
            <tr>
              <td className="hidden bold">Property</td>
              <td className="hidden">Txt Ref</td>
              <td className="hidden">Amount</td>
              <td className="hidden">Status</td>
            </tr>
          </thead>
          <tbody>
            {latest_subscription?.map((subscription) => (
              <tr>
                <td className="hidden">{subscription.pro_title}</td>
                <td className="hidden">{subscription.tx_ref}</td>

                <td className="hidden">{subscription.amount} Ugx</td>
                <td className={`hidden`}>
                  <span>{subscription.payment_status}</span>
                  <br />
                  <small>
                    <TimeAgo date={subscription.date_paid} />
                  </small>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.container}>
        <h2 className={styles.title}>Latest Properties</h2>

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
    </>
  );
};

export default Transaction;
