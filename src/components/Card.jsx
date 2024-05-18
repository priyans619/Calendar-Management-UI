import React, { useState, useEffect, useRef } from 'react';

const Card = ({ currentDate: initialDate, onClose }) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const cardRef = useRef(null);

  const handlePreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };


 
 

  return (
    <div className="fixed top-0 left-0 mt-20 ml-4 z-50">
      <div ref={cardRef} className="bg-white rounded-lg shadow-lg max-w-xs">
        
        <div className="grid grid-cols-7 gap-2 px-1">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="flex items-center justify-center font-bold text-sm">
              {day}
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Card;
