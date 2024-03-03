import instance from '../../config';


  export const notify_user = async (message) => {
    
    const response = await instance.post("send_message", JSON.stringify(message));
    return response.data;
  };
  



