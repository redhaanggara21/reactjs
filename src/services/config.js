import React from 'react';

// const headerHttp = { 
//   headers: {
//     'Authorization': `Bearer ${userSession.access_token}` 
//   }
// };

const headerHttp = () => {
    const access_token = localStorage.getItem("user");
    // console.log(access_token);
    if (access_token) {
      return { 
        headers: {
          'Authorization' : `Bearer ${access_token}` 
        }
      };
    } else {
      return {};
    }
}

const API_URL = () => {
    const API_URL = "http://localhost:8000/api/";
    return API_URL;
}

export default {
    headerHttp,
    API_URL
};