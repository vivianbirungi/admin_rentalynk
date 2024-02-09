import styles from './select.module.css';
const SelectItem = ({handleSelect, values, selectedValue}) => {
  return (
    <div className={styles.select_dropdown_container}>
      <select id="dropdown"
        className={styles.select_dropdown}
        value={selectedValue} 
        onChange={(e)=>{e.preventDefault(); handleSelect(e.target.value)}}>
          <option value="" disabled className={styles.selected_option}>Select an option</option>
          {values.map((option, i) =>(
          <option value={option} className={styles.selected_option} >{option}</option>
          ))}
         
      </select>
    </div>
  )
}

export default SelectItem
