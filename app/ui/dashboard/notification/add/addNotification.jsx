import { useState } from "react";
import SelectItem from '../../select/select';
import styles from './addNotification.module.css';
const AddNotification = () => {
    const [type, setType]= useState('landlord');
  const [message, setMessage] = useState('');
  return (
    <div>
       <form className={styles.formContainer} >
       
          <SelectItem selectedValue={type} values={['landlord','tenant']} handleSelect={(e)=>{setType(e)}}/>
         
          <SelectItem selectedValue={type} values={['User1','User2']} handleSelect={(e)=>{setType(e)}}/>
          
          <textarea
            className={styles.message}
            value={message}
            placeholder=" Message"
            onChange={(e) => setMessage(e.target.value)}
            rows={4} // Adjust the number of rows as needed
          />
     
      <button className={styles.button} type="submit">Send Message</button>
        </form>
    </div>
  )
}

export default AddNotification
