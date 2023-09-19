// import jwtDecode from 'jwt-decode';

import { API } from "../Services/Api";

// export const checkTokenExpiration = () => {

//   const token = sessionStorage.getItem('accessToken');
//   if (token) {
//     const decodedToken = jwtDecode(token);
//     if (decodedToken.exp * 1000 < Date.now()) {
//       // Token has expired
//       sessionStorage.removeItem('accessToken');
//       sessionStorage.removeItem('refreshToken');
//       sessionStorage.removeItem('isLogined');
//       localStorage.removeItem('visited');
//       return true;
//     } else {
//       // Token is still valid
//       return false;
//       // Set up timer to check for token expiration
//     }
//   }else{
//     return true;
//   }

//   }

export const getCookie=(cookieName)=> {
  // Split the cookie string into an array of key-value pairs
  const cookies = document.cookie.split(';');

  // Iterate through the cookies
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim(); // Trim any leading/trailing spaces

    // Check if this cookie has the name we're looking for
    if (cookie.startsWith(cookieName + '=')) {
      // Extract and return the cookie value (the authToken)
      return cookie.substring(cookieName.length + 1);
    }
  }

  // If the cookie is not found, return null or an appropriate default value
  return null;
}

  export const checkAdminsession = () => {

    const token = sessionStorage.getItem('adminId');
    if (token) {
      return true;
    }else{
      return false;
    }
  
    }


  export const getType = (value, body) => {
    if (value.params) {
      return { params: body }
    } else if (value.query) {
      if (typeof body === 'object') {
        return { query: body.id }
      } else {
        return { query: body._id };
      }
    }
    return {};

  }


  export const logoutUser=async()=>{

    const response=await API.userLogOut();
    console.log(response);
    if(response.isSuccess){
      localStorage.clear();
      return true;
    }else{
      return false;
    }
    
  }


  export const playDataReveal=()=>{
    document.getElementById('datareveal').play();
  }
  export const playclicksound=()=>{
    document.getElementById('clicksound').play();
  }
  export const playErrorsound=()=>{
    document.getElementById('errormusic').play();
  }
  export const playSuccesssound=()=>{
    document.getElementById('successmusic').play();
  }