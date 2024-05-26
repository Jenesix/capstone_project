import React from 'react';

interface Assignment {
    name: string;
    dueDate: string; // format: 'yyyy-MM-dd'
    dueTime: string; // format: 'HH:mm'
}

interface AgendaViewProps {
    assignments: Assignment[];
}

const AgendaView: React.FC<AgendaViewProps> = ({ assignments }) => {
    return (
        <div className="p-4">
            <h2 className="text-xl text-primary font-bold mb-4">To do list</h2>
            <ul>
                {assignments.map((assignment, index) => (
                    <li key={index} className="mb-2 p-4 rounded shadow-2xl">
                        <div className="font-bold text-xl text-primary">{assignment.name}</div>
                        <div className='font-bold text-salate-1000'>{assignment.dueDate}</div>
                        <div className='text-salate-1000'>{assignment.dueTime}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AgendaView;
