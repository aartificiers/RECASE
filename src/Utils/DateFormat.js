export const dateFormat=()=>{
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
    
      const currentDate = new Date();
      const day = currentDate.getDate();
      const monthIndex = currentDate.getMonth();
      const year = currentDate.getFullYear();
    
      const formattedDate = `${day} ${months[monthIndex]} ${year}`;

      return formattedDate;
}


export function convertDateFormat(inputDate) {
  // Parse the input date in "yyyy-MM-dd" format
  const parts = inputDate.split("-");
  
  if (parts.length === 3) {
      const year = parts[0];
      const month = parts[1];
      const day = parts[2];
      
      // Create a new date in "dd-MM-yyyy" format
      const formattedDate = `${day}-${month}-${year}`;
      
      return formattedDate;
  } else {
      // Handle invalid input
      return "Invalid Date";
  }
}