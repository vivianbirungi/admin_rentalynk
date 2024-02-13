"use client"
import useRLStore from '../lib/store'
import Card from "../ui/dashboard/card/card"
import styles from "../ui/dashboard/dashboard.module.css"
import Rightbar from "../ui/dashboard/rightbar/rightbar"
import Transaction from "../ui/dashboard/transaction/transaction"

const Dashboard = () => {
  const { landLords, tenants, properties} = useRLStore( (state) => state)
  console.log({landLords})
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        
      <div className={styles.cards}>
        <Card title='LandLords' numbers={tenants?.results?.length}/>
        <Card title='Properties' numbers={properties?.length}/>
        <Card title='Tenancies' numbers={landLords?.results?.length}/>
      </div>
      <Transaction/>
      {/* <Chart/> */}
      </div>
      <div className={styles.side}>
        <Rightbar/>
      </div>
    </div>
  )
}

export default Dashboard
