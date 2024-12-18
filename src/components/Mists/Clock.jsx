import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (date) => {
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12 || 12; 

        return `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '2rem', textAlign: 'center' }}>
            <p className='text-lg sm:text-3xl font-bold'>{formatTime(time)}</p>
        </div>
    );
};

export default Clock;
