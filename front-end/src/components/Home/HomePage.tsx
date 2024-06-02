import React, { useState, useEffect } from 'react';
import Card from './Card';
import { Class } from '@/interface/interface';

interface HomepageProps {
  role: 'teacher' | 'student';
  enrolledClasses: { classes: Class[] };
}

const Homepage: React.FC<HomepageProps> = ({ role, enrolledClasses }) => {
  const classes = enrolledClasses.classes;

  const uniqueYearSemesters = Array.from(new Set(classes.map(c => `${c.year}/${c.semester}`))).sort((a, b) => b.localeCompare(a));

  const [selectedOption, setSelectedOption] = useState<string>(() => {
    const savedOption = localStorage.getItem('selectedOption');
    // return savedOption || (uniqueYearSemesters[0] || '');
    return 'all_classes';
  });
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);

  useEffect(() => {
    if (selectedOption === 'all_classes') {
      setFilteredClasses(classes);
    }
    else if (selectedOption) {
      const [year, semester] = selectedOption.split('/');
      const filtered = classes.filter(c => c.year.toString() === year && c.semester.toString() === semester);
      setFilteredClasses(filtered);
    } else {
      setFilteredClasses(classes);
    }
  }, [selectedOption, classes]);

  useEffect(() => {
    localStorage.setItem('selectedOption', selectedOption);
  }, [selectedOption]);


  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mt-16 mx-16 2xl:mx-36">
        <h1 className="text-primary font-bold text-2xl mb-4 lg:mb-0 lg:mr-4 whitespace-nowrap">
          {role === 'teacher' ? 'Manage Classes' : 'Your Classes'}
        </h1>
        <div className="w-full md:w-96">
          <select
            className="border-2 border-primary rounded-lg w-full h-12 px-2 select-none text-primary font-bold"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="all_classes">All</option>
            {uniqueYearSemesters.map((ys, index) => (
              <option key={index} value={ys}>{ys}</option>
            ))}
          </select>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:mt-6 mt-12 gap-2 md:gap-5 xl:gap-8 mx-16 2xl:mx-36'>
        {filteredClasses.length > 0 ? (
          filteredClasses.map((classData, index) => {
            return (
              <Card key={classData._id} classData={classData} role={role} />
            )
          })
        ) : (
          <p>No classes available.</p>
        )}
      </div>
    </>
  );
};

export default Homepage;
