import { MdHomeWork, MdSupervisedUserCircle } from 'react-icons/md'
import styles from './card.module.css'
const Card = ({title, numbers}) => {
  return (
    <div className={styles.container}>
      {title == "Properties" ? <MdHomeWork size={24}/>:<MdSupervisedUserCircle size={24}/>}
      <div className={styles.texts}>
        <span className={styles.title}>{title}</span>
        <span className={styles.number}>{numbers}</span>
        <span className={styles.detail}><span className={styles.positive}>12%</span> more than previous</span>
      </div>
    </div>
  )
}

export default Card
