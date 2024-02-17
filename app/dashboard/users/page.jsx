"use client"
import { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { MdDelete, MdOutlineRemoveRedEye } from 'react-icons/md';
import useRLStore from '../../lib/store';
import Pagination from '../../ui/dashboard/pagination/pagination';

import { useRouter } from 'next/navigation';
import Search from '../../ui/dashboard/search/search';
import SelectItem from '../../ui/dashboard/select/select';
import styles from '../../ui/dashboard/users/users.module.css';
const UsersPage = () => {
  // const pages = searchParams[page]?? '1';
  // const per_page = searchParams['per_page'] ?? '5';
  const [type, setType]= useState('landlord');
  const [currentPage, setCurrentPage] = useState(1);
  const start = (Number(currentPage)-1) * 10;
  const end = start + 10;
  const router = useRouter();
  // const users = useHttpGet(`get_Users/${type}`);
  const {tenants, landLords, getLandlords, getTenants, setActiveUser} = useRLStore(state => state);
  Array.isArray(landLords.results) ? landLords?.results.slice(start, end) : []
  const entries = type === 'landlord' ? (Array.isArray(landLords.results) ? landLords?.results.slice(start, end):[]) :(Array.isArray(tenants?.results)?tenants.results?.slice(start, end):[])
  const [filteredData, setFilteredData] = useState(type === 'landlord' ? (Array.isArray(landLords.results) ? landLords?.results.slice(start, end):[]) :(Array.isArray(tenants?.results)?tenants.results?.slice(start, end):[]));
  
  const handleSearch = (searchTerm) => {
    const filtered = entries.filter((item) =>
      Object.values(item).some((value) => value.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredData(filtered);
  };
  
  const getUsers = ()=>{
    if(type === 'landlord'){ getLandlords();
    
    }
    else {getTenants();}
  }
  useEffect(()=>{
    // users.getData();
    
      getUsers();
      setFilteredData(entries)
    },[type])
 
  const handlePagination =(e) => {
    setCurrentPage(e); 
  }
  const handleViewUser =(id, type) => {
      setActiveUser(id, type);
      router.push('/dashboard/users/user')
  }
  return (
    <div className={styles.container}>
    <div className={styles.top}>
    <SelectItem selectedValue={type} values={['landlord','tenant']} handleSelect={(e)=>{setType(e)}}/>
    <Search placeholder="Search for a user..." onSearch={handleSearch}/>
      
    </div>
    
    <table className={styles.table}>
      <thead>
        <tr>
          <td >Name</td>
          <td className='hidden'>Email</td>
          <td className='hidden'>Created At</td>
          <td className='hidden'>Role</td>
          <td className='hidden'>Status</td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
      {entries.map((user)=>(
      <tr key={user.user_id}>
              <td>
                <div className={styles.user}>
                <Avatar size="48" name={user?.full_name} round={true} />
                  {user?.full_name}
                </div>
              </td>
              <td className='hidden'> {user?.email}</td>
              <td className='hidden'> {user?.created_at}</td>
              <td className='hidden'>{user?.user_type}</td>
              <td className='hidden'>{user?.isVerified == "Y"?"YES":"NO"}</td>
              <td>
                <div className={styles.buttons}>
                 
                    <button className={`${styles.button} ${styles.view}`} onClick={()=>handleViewUser(user.user_id, user.user_type)}>
                      <MdOutlineRemoveRedEye />
                    </button>
                
                  
                    <input type="hidden" name="id" value='' />
                    <button className={`${styles.button} ${styles.delete}`}>
                      <MdDelete/>
                    </button>
                 
                </div>
              </td>
      </tr>))}
      
        </tbody>
      </table>
      <Pagination arrayLength={type=='landlord'?landLords?.results?.length: tenants?.results?.length}
          currentPage={currentPage}
          handleClick={handlePagination}
          perpage={10} />
    </div>
  )
}

export default UsersPage
