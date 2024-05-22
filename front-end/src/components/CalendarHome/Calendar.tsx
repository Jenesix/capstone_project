"use client";
import React from 'react';
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    isSameMonth,
    isSameDay,
    parseISO,
    addMonths,
    getDate
} from 'date-fns';

interface Assignment {
    name: string;
    dueDate: string; // format: 'yyyy-MM-dd'
    dueTime: string; // format: 'HH:mm'
}

interface CalendarProps {
    assignments: Assignment[];
}

const Calendar: React.FC<CalendarProps> = ({ assignments }) => {
    const [currentMonth, setCurrentMonth] = React.useState(new Date());

    const renderHeader = () => {
        const dateFormat = 'MMMM yyyy';

        return (
            <div className="flex justify-between items-center py-2 mb-6 mx-12">
                <button
                    onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
                    className="text-white bg-primary-light font-bold px-4 py-2 rounded-full transform transition-transform duration-300 hover:bg-blue-600 hover:scale-105"
                >
                    Previous
                </button>
                <div className="text-lg font-bold">{format(currentMonth, dateFormat)}</div>
                <button
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                    className="text-white bg-primary-light font-bold px-4 py-2 rounded-full transform transition-transform duration-300 hover:bg-blue-600 hover:scale-105"
                >
                    Next
                </button>

            </div>
        );
    };

    const renderDays = () => {
        const days = [];
        const dateFormat = 'EEE';
        const startDate = startOfWeek(new Date(), { weekStartsOn: 0 });

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="text-xs font-bold text-center" key={i}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return <div className="grid grid-cols-7">{days}</div>;
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
        const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

        const rows = [];
        let days = [];
        let day = startDate;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const formattedDate = format(day, 'd');

                const assignmentsForDay = assignments.filter(assignment =>
                    isSameDay(parseISO(assignment.dueDate), day)
                );

                const isCurrentMonth = isSameMonth(day, monthStart);
                const isDayFromCurrentMonth = getDate(day) <= getDate(monthEnd) && getDate(day) >= 1;

                days.push(
                    <div
                        className={`p-2  h-32 ${!isCurrentMonth ? 'text-gray-400' : ''}`}
                        key={day.toISOString()}
                    >
                        <div className="text-center">{isCurrentMonth && isDayFromCurrentMonth ? formattedDate : ''}</div>
                        <div className="overflow-y-auto h-20 pr-2 mt-1">
                            {isCurrentMonth && isDayFromCurrentMonth && assignmentsForDay.map((assignment, idx) => (
                                <div key={idx} className="text-xs mt-1 bg-assign border-l-primary border-l-4 p-1 rounded text-primary ">
                                    {assignment.name} <br /> {assignment.dueTime}
                                </div>
                            ))}
                        </div>
                    </div>
                );

                day = addDays(day, 1);
            }

            rows.push(
                <div className="grid grid-cols-7 text-salate-600" key={day.toISOString()}>
                    {days}
                </div>
            );

            days = [];
        }

        return <div>{rows}</div>;
    };

    return (
        <div className="w-full max-w-7xl mx-auto mt-4">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
        </div>
    );
};

export default Calendar;
