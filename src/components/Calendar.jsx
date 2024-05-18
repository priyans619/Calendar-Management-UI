import React from 'react';
import dayjs from 'dayjs';

const Calendar = ({ currentDate }) => {
  if (!currentDate || !dayjs.isDayjs(currentDate)) {
    return null; 
  }

  const daysInMonth = currentDate.daysInMonth();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-fixed border-collapse border border-gray-300">
        <thead>
          <tr>
            {daysArray.map((day) => {
              const date = currentDate.date(day);
              return (
                <th
                  key={day}
                  className="px-4 border border-gray-300 bg-gray-100 text-sm text-center"
                >
                  {date.format('D')}<br />
                  {date.format('ddd')}
                </th>
              );
            })}
          </tr>
        </thead>
        
      </table>
    </div>
  );
};

export default Calendar;
