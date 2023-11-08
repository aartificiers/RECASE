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

export function addAMPMToTime(timeStr) {
  try {
    const [hours, minutes] = timeStr.split(':').map(Number);

    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      return '---';
    }

    const ampm = hours < 12 ? 'AM' : 'PM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format

    return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
  } catch (error) {
    return '---';
  }
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


export function checkLiveOut(items){
  const currentTime = new Date();
  const result = { status: false, ids: [] };

  items.forEach((item) => {
    // Parse the end time from the "HH:mm" format
    const [endHour, endMinute] = item.live_end_time?.split(':');
    const endTime = new Date();
    endTime.setHours(parseInt(endHour, 10), parseInt(endMinute, 10), 0, 0);

    if (currentTime >= endTime) {
      result.status = true;
      result.ids.push(item._id);
    }
  });

  return result;

}