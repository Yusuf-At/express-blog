const convertToWIB = date => {
    const now = new Date();
    const offset = 7 * 60 * 60 * 1000; // 7 HOURS IN MILLISECONDS
  
    const getHoursAndMinutes = date => ({
      hours: date.getUTCHours(),
      minutes: date.getUTCMinutes()
    });
  
    const inputTime = getHoursAndMinutes(date);
    const currentTime = getHoursAndMinutes(now);
  
    // Jika jam dan menit sama, tidak perlu penyesuaian
    if (inputTime.hours === currentTime.hours && inputTime.minutes === currentTime.minutes) {
      return date;
    }
  
    // Lakukan penyesuaian dengan waktu Jakarta
    return new Date(date.getTime() + offset);
  };
  
  const convertFirestoreTimestampToDate = (timestamp) => {
    const date = new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  };
  
  const convertFirestoreTimestampToFullDateTime = (timestamp) => {
    const date = new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };
  
  module.exports = {
    convertToWIB,
    convertFirestoreTimestampToDate,
    convertFirestoreTimestampToFullDateTime
  };
  