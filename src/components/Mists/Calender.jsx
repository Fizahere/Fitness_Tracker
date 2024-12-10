import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import { isToday } from 'date-fns';

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const renderHeader = () => (
        <div className="flex justify-between items-center py-4">
            <button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="text-gray-400 hover:text-white"
            >
                &lt;
            </button>
            <h2 className="text-xl font-bold text-white">{format(currentMonth, 'MMMM yyyy')}</h2>
            <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="text-gray-400 hover:text-white"
            >
                &gt;
            </button>
        </div>
    );

    const renderDays = () => {
        const days = [];
        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        weekDays.forEach((day) => {
            days.push(
                <div key={day} className="text-center text-gray-500 text-sm font-medium">
                    {day}
                </div>
            );
        });

        return <div className="grid grid-cols-7">{days}</div>;
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = '';

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, 'd');
                const cloneDay = day;
                days.push(
                    <div
                        key={day}
                        onClick={() => setSelectedDate(cloneDay)}
                        className={`p-4 text-center cursor-pointer ${isSameMonth(day, monthStart)
                                ? isSameDay(day, selectedDate)
                                    ? 'bg-gray-700 text-white rounded-full'
                                    : isToday(day) 
                                        ? 'bg-blue-600 text-white rounded-full'
                                        : 'text-gray-300 hover:bg-gray-800 rounded'
                                : 'text-gray-500'
                            }`}
                    >
                        {formattedDate}
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div key={day} className="grid grid-cols-7">
                    {days}
                </div>
            );
            days = [];
        }

        return <div>{rows}</div>;
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-[#1b1b1c] rounded shadow-lg">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
        </div>
    );
};

export default Calendar;
