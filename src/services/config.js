import React from 'react';

// const headerHttp = { 
//   headers: {
//     'Authorization': `Bearer ${userSession.access_token}` 
//   }
// };

const headerHttp = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.access_token) {
      return { 
        headers: {
          'Authorization' : `Bearer ${user.access_token}` 
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