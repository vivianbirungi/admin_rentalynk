"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdCheckCircle, MdCheckCircleOutline } from "react-icons/md";
import instance from '../../../../config';
import useRLStore from '../../../lib/store';
import Pagination from "../../../ui/dashboard/pagination/pagination";
import styles from "../../../ui/dashboard/users/singleUser/singleUser.module.css";
const SingleUserPage =  () => {
const {activeUser, properties, } =useRLStore(state => state);
// useEffect(()=>{getActiveUser})
const myProperties = properties.filter(property => property.landlord_id === activeUser.user_id);
const [currentPage, setCurrentPage] = useState(1);
const [activeTab, setActiveTab] =useState('properties');
const [subscriptions, setSubscriptions] = useState([])
const [bookings, setBookings] = useState([])
const start = (Number(currentPage)-1) * 10;
const end = start + 10;
const entries = myProperties.slice(start, end);
const get_subscription= async()=>{
   const subscriptions = await instance.get(`get_subscriptions/${activeUser.user_id}`);
   console.log(subscriptions)
   setSubscriptions(subscriptions.data.results)
}
const getUserbooking = async()=>{
  const response = await instance.get(`get_user_bookings/${activeUser.user_id}`);
  console.log(response);
  setBookings(response.data.results);
}
const handlePagination =(e) => {
  setCurrentPage(e);
  
}
useEffect(()=>{
  if(activeUser.user_type == 'landlord') get_subscription();
  else getUserbooking();
},[])
console.log({myProperties});
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src= "/noavatar.png" alt="" width={200} height= {200}/>
        </div>
        <div className={styles.userDetail}>
          <div className={styles.header}>
             <span>{activeUser?.full_name}</span>
             <span>{activeUser?.isverified}</span>
          </div>
          <div className={styles.userInfo}>
            <div><span>Role: </span> <span>{activeUser?.user_type}</span></div>
            <div><span>Email:</span> <span> {activeUser?.email}</span></div>
            <div><span>phone: </span> <span>{activeUser?.phone}</span></div>
            <div><span>Country:</span> <span>{activeUser?.country} </span></div>
        

          </div>
        </div>
      </div>
      {activeUser?.user_type =='landlord'?(<div className={styles.formContainer}>
        <div className={styles.tabcontainer}>
        <div className={styles.tabHeader}>
          <button className={`${styles.tabbutton} ${activeTab=='properties' ? styles.tabactive : ''}`} onClick={()=>setActiveTab('properties')}>Properties</button>
          <button className={`${styles.tabbutton} ${activeTab== 'subscriptions' ? styles.tabactive : ''}`} onClick={()=>setActiveTab('subscriptions')}>Subscriptions</button>
        </div>
       <div className={styles.tabbody}>
        
      {activeTab=='properties'? (
      <div className={styles.propertyContainer}>
        <h4>Properties</h4>
        <table className={styles.table}>
      
      <tbody>
     {entries.map(myProperty =>(<><tr className={styles.hr}>
      {myProperty.images && (
      <td>
        <img
          src={`https://api.rentalynk.com/properties/${myProperty.property_id}/${myProperty.images.split(',')[0].trim()}`}  // Display only the first image
          alt={`First Image`}
          width={40}
          height={40}
          className={styles.userImage}
        />
      </td>
    )}
              <td>{myProperty?.pro_title}<br/><span className={styles.muted_text}>{myProperty?.total_units} units </span></td>
              <td>{myProperty?.created_at}</td>
      </tr>
     </>))}
    
        </tbody>
      </table>
      <Pagination arrayLength={myProperties.length}
          currentPage={currentPage}
          handleClick={handlePagination}
          perpage={10} />
      </div>):(
      <div className={styles.tendanciesContainer}>
      <h4>Subscriptions</h4>
      <table className={styles.table}>
      
      <tbody>
      {subscriptions.map(subscription=>(<tr>
              <td>
                <div className={styles.user}>
                  
                  {subscription?.pro_title}
                </div>
              </td>
              <td>{subscription?.subscription_active}</td>
              <td>
                {subscription?.payment_status}
              </td>
              <td>
                {subscription?.amount}
              </td>
      </tr>))}
     
        </tbody>
      </table>
      </div>)}
      </div> 
      </div>
      </div>):(
      <div className={styles.tendanciesContainer}>
        <div className={styles.bookings}> 
          <h4>Bookings</h4>
         <ul>
         {bookings.map(booking=>(<li className={styles.booking}>
          
            <div className={styles.booking_details}>
              <h5 className={styles.booking_header}>{booking?.pro_title}</h5>
              <span className={styles.muted_text}>{booking?.pro_type}</span>
              <span className={styles.muted_text}>{booking.booked_date}</span>
            </div>
            <div className={styles.booking_status}>
            
            
            {booking?.booking_status == 'approved'?(<MdCheckCircle color='#1548be'  />):(<MdCheckCircleOutline color="gray"/>) }
            </div>
         </li>))}
         </ul>
         </div>
      </div>
      )}
      
    </div>
  );
};

export default SingleUserPage;