"use client"
import useRLStore from '@/app/lib/store';
import Image from 'next/image';
import { AiOutlineStop } from 'react-icons/ai';
import { MdOutlineAutoAwesome, MdOutlineHourglassEmpty } from "react-icons/md";
import AddNotification from '../notification/add/addNotification';
import styles from './rightbar.module.css';
const Rightbar = () => {
  const {bookings} = useRLStore((state) => state);
  console.log({bookings});
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image src='/astronaut.png' alt="" fill className={styles.bg}/>

        </div>
        <div className={styles.texts}>
          <div className={styles.bookings}>
          <h4 className={styles.title}>🔥 Available Bookings</h4>
          <div className={styles.bookingItem}><MdOutlineAutoAwesome size={24} color='green'/><span> Approved</span> <span>100</span></div>
          <div className={styles.bookingItem}><MdOutlineHourglassEmpty size={24} color='#f7737375'/><span> Pending</span><span>100</span></div>
          <div className={styles.bookingItem}><AiOutlineStop size={24} color='gray'/><span>Declined</span><span>100</span></div>
          </div>
          {/* <span className={styles.subtitle}>Takes 4 minutes to learn</span>
          <p className={styles.desc}> Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit eius libero perspiciatis recusandae possimus.</p> */}
            
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.text}>
          <span className={styles.notification}>🚀  Notify User</span>
          <h3 className={styles.title}>
           Let the user Know
          </h3>
         <AddNotification/>
        </div>
      </div>
    </div>
  )
}

export default Rightbar
