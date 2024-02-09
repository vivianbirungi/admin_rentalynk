import { useState } from 'react'
import styles from './tabs.module.css'
const tabdata=[{id:1, title:'properties', value: 'properties'},{id:2, title:'Tenancies', value: 'properties'}]
const Tabs = () => {
    const [activeTab, setActiveTab] =useState(1)
  return (
    <div className={styles.container}>
      <div className={styles.tabHeader}>
        {tabdata.map((header)=>(
            <button className={`${styles.button} ${activeTab==header.id ? styles.active : ''}`} onClick={()=>setActiveTab(header.id)}>{header.title}</button>
        ))}
       
      </div>
      </div>
   
  )
}

export default Tabs
