
export const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        weekday: 'long', 
        year: 'numeric',
        month: 'short', 
        day: 'numeric',
    });
};