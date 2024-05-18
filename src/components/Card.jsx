import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

const Card = ({ currentDate: initialDate, onClose }) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const cardRef = useRef(null);

  const handlePreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  const daysInMonth = currentDate.daysInMonth();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const startDay = currentDate.startOf('month').day(); // Day of the week the month starts on
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];


  const calendarGrid = [];
  for (let i = 0; i < startDay; i++) {
    calendarGrid.push(null);
  }
  daysArray.forEach(day => calendarGrid.push(day));

 

  return (
    <div className="fixed top-0 left-0 mt-20 ml-4 z-50">
      <div ref={cardRef} className="bg-white rounded-lg shadow-lg max-w-xs">
        <div className="flex justify-between items-center px-3 py-2">
          <button onClick={handlePreviousMonth} className="text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
          </button>
          <h2 className="text-lg font-bold">{currentDate.format('MMMM YYYY')}</h2>
          <button onClick={handleNextMonth} className="text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 px-1">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="flex items-center justify-center font-bold text-sm">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 border-t border-gray-400 mt-1">
          {calendarGrid.map((day, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-6 text-sm"
              style={{ borderTop: index < 7 ? 'none' : '1px solid #ccc' }}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
