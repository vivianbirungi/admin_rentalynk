"use client"
import { useState } from "react";
import { MdArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";
import styles from './accordion.module.css';

const Accordion = ({title, items}) => {
    const [active, setActive]= useState(false);
  return (
    <div className={styles.accordion} onClick={()=>setActive(!active)}>
      <div className={styles.accordionHeader}>
        <span>{title}</span> 
        {active ?<MdArrowDropUp size={30}/>:<MdOutlineArrowDropDown size={30} />}
      </div>
      {active && <div className={styles.accordionItems}>
        {items.map(item =>(
            <li className={styles.accordionItem}>
                hello
            </li>
        ))}
      </div>}
    </div>
  )
}

export default Accordion
