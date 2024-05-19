import React from 'react';
import AssignBanner from './AssignBanner';
import AssignmentCard from './AssignmentCard';

const assignments = [
    {
        id: 1,
        title: "Math Homework",
        description: "Complete the algebra problems on page 42.",
        dueDate: "2024-05-21",
        status: "To Do"
    },
    {
        id: 2,
        title: "Science Project",
        description: "Prepare a presentation on renewable energy sources.",
        dueDate: "2024-05-22",
        status: "Submitted"
    },
    {
        id: 3,
        title: "History Essay",
        description: "Write an essay on the causes of World War II.",
        dueDate: "2024-05-18",
        status: "Late Submitted"
    },
    {
        id: 4,
        title: "History Essay",
        description: "Write an essay on the causes of World War II.",
        dueDate: "2024-05-18",
        status: "Late Submitted"
    },
    {
        id: 5,
        title: "History Essay",
        description: "Write an essay on the causes of World War II.",
        dueDate: "2024-05-18",
        status: "Late Submitted"
    }

];

const Assignmentpage: React.FC = () => {
    const toDoAssignments = assignments.filter(assignment => assignment.status === "To Do");
    const submittedAssignments = assignments.filter(assignment => assignment.status === "Submitted" || assignment.status === "Late Submitted");
    return (
        <div className="flex flex-col mt-12 w-full px-4 sm:px-8 pb-80">
            <h1 className="text-primary text-center font-bold text-xl sm:text-2xl lg:text-3xl">Assignment</h1>
            <div className="flex flex-col md:flex-row mx-12">
                <div className="mb-4 md:mb-0 md:mr-4">
                    <AssignBanner color="text-bookmark1" text="To Do" />
                </div>
                <div className="mb-4 md:mb-0 md:mr-4">
                    <AssignBanner color="text-bookmark2" text="Submitted" />
                </div>
                <div>
                    <AssignBanner color="text-bookmark3" text="Late Submitted" />
                </div>
            </div>
            <div className="mx-12 mt-5">
                <div className="flex flex-row items-center mb-4">
                    <span className="font-bold text-salate-100">To Do</span>
                    <div className="flex-grow border-t border-2 border-salate-100 ml-2"></div>
                </div>

                {/* To Do Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {toDoAssignments.map(assignment => (
                        <AssignmentCard
                            key={assignment.id}
                            title={assignment.title}
                            description={assignment.description}
                            dueDate={assignment.dueDate}
                            status={assignment.status}
                        />
                    ))}
                </div>
            </div>

            {/* Submitted Section */}
            <div className="mx-12 mt-5">
                <div className="flex flex-row items-center mb-4">
                    <span className="font-bold text-salate-100">Submitted</span>
                    <div className="flex-grow border-t border-2 border-salate-100 ml-2"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {submittedAssignments.map(assignment => (
                        <AssignmentCard
                            key={assignment.id}
                            title={assignment.title}
                            description={assignment.description}
                            dueDate={assignment.dueDate}
                            status={assignment.status}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Assignmentpage;
