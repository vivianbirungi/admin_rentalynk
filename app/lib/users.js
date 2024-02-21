import instance from '../../../config';

const login = async user => {
    const response = await instance.post(
      'authenticationservice/mobileLogin',
      JSON.stringify(user),
    );
    return response.data;
  };

export default {login};


