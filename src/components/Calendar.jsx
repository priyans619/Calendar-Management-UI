import React from 'react';
import dayjs from 'dayjs';

const Calendar = ({ currentDate }) => {
  if (!currentDate || !dayjs.isDayjs(currentDate)) {
    return null;
  }

  const daysInMonth = currentDate.daysInMonth();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Generate resource labels from 'Resource A' to 'Resource O'
  const resourceLabels = Array.from({ length: 15 }, (_, i) => `Resource ${String.fromCharCode(65 + i)}`);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-fixed border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="w-32 px-4 border border-gray-300 text-sm text-left bg-white sticky left-0 z-10"></th>
            {daysArray.map((day) => {
              const date = currentDate.date(day);
              return (
                <th
                  key={day}
                  className="px-4 border border-gray-300 text-sm text-left whitespace-nowrap"
                >
                  <div className="flex items-center">
                    <span>{date.format('D')}</span>
                    <span className="ml-2">{date.format('ddd')}</span>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {resourceLabels.map((resource, rowIndex) => (
            <tr key={rowIndex}>
              <td className="w-32 pr-24 border border-gray-300 font-bold text-left align-top bg-gray-50 sticky left-0 z-10 whitespace-nowrap">{resource}</td>
              {daysArray.map((day) => (
                <td
                  key={day}
                  className="px-10 py-8 border border-gray-300 text-left align-top"
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
