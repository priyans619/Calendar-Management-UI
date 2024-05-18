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
        <tbody>
          {Array.from({ length: 15 }).map((_, rowIndex) => ( // Add 5 rows
            <tr key={rowIndex}>
              {daysArray.map((day) => (
                <td
                  key={day}
                  className="px-10 py-8 border border-gray-300 text-center"
                >
                 
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
