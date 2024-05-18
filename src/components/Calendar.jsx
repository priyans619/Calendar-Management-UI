import React from 'react';
import dayjs from 'dayjs';

const Calendar = ({ currentDate }) => {
  

  const daysInMonth = currentDate.daysInMonth();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-fixed border-collapse border border-gray-300">
        
        
      </table>
    </div>
  );
};

export default Calendar;
