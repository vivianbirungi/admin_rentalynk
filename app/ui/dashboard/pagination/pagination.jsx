"use client";

import { MdOutlineSkipNext, MdOutlineSkipPrevious } from "react-icons/md";
import styles from "./pagination.module.css";

const Pagination = ({ 
  arrayLength,
  currentPage,
  handleClick,
  perpage }) => {
  
   const lastPage = Math.ceil(arrayLength / perpage);


  return (
    <div className={styles.container}>
     {currentPage > 1 && (
          <button onClick={()=>handleClick(currentPage-1)}
            className={styles.Pagination__buttons}
            
          >
          <MdOutlineSkipPrevious/> Previous
          </button>
        )}
        
        {currentPage < lastPage && (
                   <button onClick={()=>handleClick(currentPage + 1)}
                    className={styles.Pagination__buttons}>
            Next <MdOutlineSkipNext/>
          </button>
        )}
    </div>
  );
};

export default Pagination;