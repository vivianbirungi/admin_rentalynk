"use client";
import AddNotification from "@/app/ui/dashboard/notification/add/addNotification";
import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { MdCheckCircle, MdCheckCircleOutline } from "react-icons/md";
import instance from "../../../../config";
import useRLStore from "../../../lib/store";
import Pagination from "../../../ui/dashboard/pagination/pagination";
import styles from "../../../ui/dashboard/users/singleUser/singleUser.module.css";
const SingleUserPage = () => {
  const { activeUser, properties, setActiveProperty } = useRLStore(
    (state) => state
  );
  // useEffect(()=>{getActiveUser})
  const myProperties = properties.filter(
    (property) => property?.landlord_id === activeUser?.user_id
  );
  console.log({ myProperties });
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [subscriptions, setSubscriptions] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [tenancies, setTenancies] = useState([]);
  const start = (Number(currentPage) - 1) * 10;
  const end = start + 10;
  const entries = myProperties.slice(start, end);
  const get_subscription = async () => {
    const subscriptions = await instance.get(
      `get_subscriptions/${activeUser?.user_id}`
    );
    setSubscriptions(subscriptions.data.results);
  };
  const getUserbooking = async () => {
    const response = await instance.get(
      `get_user_bookings/${activeUser?.user_id}`
    );
    console.log(response);
    setBookings(response.data.results);
  };
  const getUserTenancies = async () => {
    const response = await instance.get(
      `get_user_bookings/${activeUser?.user_id}`
    );
    console.log(response);
    setBookings(response.data.results);
  };
  const handlePagination = (e) => {
    setCurrentPage(e);
  };
  useEffect(() => {
    if (activeUser?.user_type == "landlord") get_subscription();
    else getUserbooking();
  }, []);
  const handleViewProperty = (id) => {
    setActiveProperty(id);
    router.push("/dashboard/property/property");
  };
  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.imgContainer}>
            <Avatar
              className="hidden"
              name={activeUser?.full_name}
              size="200"
              color="#0d433e"
            />
          </div>
          <div className={styles.userDetail}>
            <div className={styles.header}>
              <span>{activeUser?.full_name}</span>
              <span>{activeUser?.isverified}</span>
            </div>
            <div className={styles.userInfo}>
              {/* <div>
                <span>Role: </span> <span>{activeUser?.user_type}</span>
              </div> */}
              <div>
                <span>Email:</span> <span> {activeUser?.email}</span>
              </div>
              <div>
                <span>phone: </span>{" "}
                <span>
                  {activeUser?.country_code}
                  {activeUser?.phone}
                </span>
              </div>
              <div>
                <span>Date: </span> <span>{activeUser?.created_at}</span>
              </div>
            </div>
          </div>
        </div>

        <>
          {activeUser?.user_type == "landlord" ? (
            <>
              {" "}
              {myProperties.length > 0 || subscriptions.length > 0 ? (
                <div className={styles.bookingContainer}>
                  <div className={styles.tabcontainer}>
                    <div className={styles.tabHeader}>
                      <button
                        className={`${styles.tabbutton} ${
                          activeTab == 0 ? styles.tabactive : ""
                        }`}
                        onClick={() => setActiveTab(0)}
                      >
                        Properties
                      </button>
                      <button
                        className={`${styles.tabbutton} ${
                          activeTab == 1 ? styles.tabactive : ""
                        }`}
                        onClick={() => setActiveTab(1)}
                      >
                        Subscriptions
                      </button>
                    </div>
                    <div className={styles.tabbody}>
                      {activeTab == 0 ? (
                        <div className={styles.propertyContainer}>
                          <h4>Properties</h4>
                          <table>
                            <tbody>
                              {entries.map((myProperty) => (
                                <>
                                  <tr
                                    className={styles.hr}
                                    onClick={() =>
                                      handleViewProperty(myProperty.property_id)
                                    }
                                  >
                                    {myProperty.images && (
                                      <td>
                                        <img
                                          src={`https://api.rentalynk.com/properties/${
                                            myProperty.property_id
                                          }/${myProperty.images
                                            .split(",")[0]
                                            .trim()}`} // Display only the first image
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
                                    </td>
                                    <td>
                                      {" "}
                                      <span>
                                        {myProperty?.total_units} units{" "}
                                      </span>
                                    </td>
                                    <td>
                                      {myProperty?.subscription_active ===
                                      "Y" ? (
                                        <span className="">Active</span>
                                      ) : (
                                        <span>Inactive</span>
                                      )}
                                    </td>
                                    <td>{myProperty?.created_at}</td>
                                  </tr>
                                </>
                              ))}
                            </tbody>
                          </table>
                          <Pagination
                            arrayLength={myProperties.length}
                            currentPage={currentPage}
                            handleClick={handlePagination}
                            perpage={10}
                          />
                        </div>
                      ) : (
                        <div className={styles.tendanciesContainer}>
                          <h4>Subscriptions</h4>
                          <table>
                            <tbody>
                              {subscriptions.map((subscription) => (
                                <tr>
                                  <td>
                                    <div className={styles.user}>
                                      {subscription?.pro_title}
                                    </div>
                                  </td>
                                  <td>{subscription.tx_ref}</td>
                                  <td></td>
                                  <td>{subscription?.subscription_active}</td>
                                  <td>{subscription?.payment_status}</td>
                                  <td>{subscription?.amount}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              {bookings.length}
              {bookings?.length > 0 || tenancies?.length > 0 ? (
                <div className={styles.tendanciesContainer}>
                  <div className={styles.bookingContainer}>
                    <div className={styles.tabcontainer}>
                      <div className={styles.tabHeader}>
                        <button
                          className={`${styles.tabbutton} ${
                            activeTab == 0 ? styles.tabactive : ""
                          }`}
                          onClick={() => setActiveTab(0)}
                        >
                          Bookings
                        </button>
                        <button
                          className={`${styles.tabbutton} ${
                            activeTab == 1 ? styles.tabactive : ""
                          }`}
                          onClick={() => setActiveTab(1)}
                        >
                          Tenancies
                        </button>
                      </div>
                      <div className={styles.tabbody}>
                        {activeTab == 0 ? (
                          <div className={styles.bookings}>
                            {/* <h4>Bookings</h4> */}
                            <table>
                              <tbody>
                                {bookings.map((booking) => (
                                  <tr className={styles.booking}>
                                    <td className={styles.booking_details}>
                                      <h5 className={styles.booking_header}>
                                        {booking?.pro_title}
                                      </h5>
                                    </td>
                                    <td>
                                      {" "}
                                      <span>{booking?.pro_type}</span>
                                    </td>
                                    <td>
                                      <span>{booking.booked_date}</span>
                                    </td>
                                    <td>
                                      <div className={styles.booking_status}>
                                        {booking?.booking_status ==
                                        "approved" ? (
                                          <MdCheckCircle color="#d5770a" />
                                        ) : (
                                          <MdCheckCircleOutline color="gray" />
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          )}
        </>
      </div>
      <div className={styles.formMainContainer}>
        <div className={styles.formBody}>
          <AddNotification />
        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;
