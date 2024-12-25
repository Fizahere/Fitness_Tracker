
export const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export const getHoursAgo = (createdAt) => {
    const currentTime = new Date(); 
  const createdTime = new Date(createdAt); 
  const timeDifference = currentTime - createdTime; 
  
  const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60)); 
  
  if (hoursAgo >= 24) {
    const daysAgo = Math.floor(hoursAgo / 24); 
    return `${daysAgo} days ago`;
  }
  
  return `${hoursAgo} hours ago`;
}

