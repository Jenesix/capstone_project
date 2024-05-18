// pages/index.tsx
import Calendar from '@/components/CalendarHome/MyCalendar';
import AgendaView from '@/components/CalendarHome/AgendaView';
import React from 'react';
import "../../globals.css";

const assignments = [
    { name: 'CSS234-Assignment 1', dueDate: '2024-05-11', dueTime: '11:00' },
    { name: 'CSS234-Assignment 2', dueDate: '2024-05-15', dueTime: '15:00' },
    { name: 'CSS234-Assignment 3', dueDate: '2024-05-15', dueTime: '15:00' },
    { name: 'CSS234-Assignment 4', dueDate: '2024-05-15', dueTime: '15:00' },
    { name: 'CSS234-Assignment 5', dueDate: '2024-05-15', dueTime: '15:00' },
];

const Home: React.FC = () => {
    return (
        <div className="w-full mt-6">
            <div className="hidden lg:block">
                <Calendar assignments={assignments} />
            </div>
            <div className="block lg:hidden">
                <AgendaView assignments={assignments} />
            </div>
        </div>
    );
};

export default Home;
