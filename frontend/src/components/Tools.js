import moment from 'moment';

export const formatDate = (timestamp) => {
    const postTimeUTC = moment.utc(timestamp);
    const currentTimeUTC = moment.utc();
  
    const diffInMinutes = currentTimeUTC.diff(postTimeUTC, 'minutes');
    const diffInHours = currentTimeUTC.diff(postTimeUTC, 'hours');
    const diffInDays = currentTimeUTC.diff(postTimeUTC, 'days');
  
    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    } else {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    }
  };

  export default formatDate;