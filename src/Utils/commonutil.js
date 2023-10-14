// import jwtDecode from 'jwt-decode';

import { API } from "../Services/Api";


export function convertDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
  const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function sortArrayByDate(arrayOfObjects) {
  // Use the JavaScript Array.sort() method with a custom comparator function
  arrayOfObjects?.sort((a, b) => {
    const createdAtA = new Date(a.createdAt);
    const createdAtB = new Date(b.createdAt);

    // Compare createdAt values in descending order
    if (createdAtA > createdAtB) {
      return -1;
    } else if (createdAtA < createdAtB) {
      return 1;
    } else {
      return 0;
    }
  });

  return arrayOfObjects;
}

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