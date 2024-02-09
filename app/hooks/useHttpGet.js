'use client'
import { useEffect, useState } from 'react';
import instance from '../../config';

export  const  useHttpGet = (url, id = null)=>{
    const [loading, setLoading]= useState(true);
    const [data, setData]   = useState(null);
    const [error, setError] = useState(null);
    const getData =async()=>{
        try {
            const response = id == null ? await instance.get(`${url}/${id}`) : await instance.get();
            setData(response.data.results);
        } catch (error) {
            setError(error);
        }
        finally{
            setLoading(false);
        }
        
    }
    useEffect(() =>{
        getData();
    },[])
  return {data, loading, error, getData};
}
export const useHttpPost = (url, data, id = null) =>{
    const [loading, setLoading]= useState(true);
    const [response, setResponse]   = useState(null);
    const [error, setError] = useState(null);
    const postData = async()=>{
        try {
        const res = await axios.post(url, data);
        console.log('User created:', response.data);
        // Handle success, e.g., redirect to user profile page
      } catch (error) {
        console.error('Error creating user:', error.message);
        // Handle error, e.g., display an error message to the user
      }
      finally{
        setLoading(false);
    }
    }
    return {postData, loading,error};
}
// export default useHttpGet
