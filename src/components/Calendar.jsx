import React, { useState, useRef } from 'react';
import dayjs from 'dayjs';

const Calendar = ({ currentDate }) => {
  if (!currentDate || !dayjs.isDayjs(currentDate)) {
    return null;
  }

  const daysInMonth = currentDate.daysInMonth();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // labels from 'Resource A' to 'Resource O'
  const resourceLabels = Array.from({ length: 15 }, (_, i) => `Resource ${String.fromCharCode(65 + i)}`);

  // for tracking the events for each row
  const [events, setEvents] = useState({});

  // to track the start and end points of the drag
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);

  // State to track the scroll position during dragging
  const scrollContainerRef = useRef(null);

  // Function to handle mouse down event
  const handleMouseDown = (day, rowIndex) => {
    setDragStart(day);
    setCurrentRow(rowIndex);
  };

  // Function to handle mouse up event
  const handleMouseUp = () => {
    if (dragStart !== null && dragEnd !== null && currentRow !== null) {
      setEvents((prevEvents) => {
        const rowEvents = prevEvents[currentRow] || [];
        return {
          ...prevEvents,
          [currentRow]: [...rowEvents, { start: dragStart, end: dragEnd }],
        };
      });
    }
    setDragStart(null);
    setDragEnd(null);
    setCurrentRow(null);
  };

  // Function to handle mouse enter event
  const handleMouseEnter = (day) => {
    if (dragStart !== null) {
      setDragEnd(day);
      ensureScrollVisible(day);
    }
  };

  // Ensure the dragged area is visible by scrolling the container
  const ensureScrollVisible = (day) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cellWidth = container.scrollWidth / daysInMonth;
      const targetScroll = (day - 1) * cellWidth;

      const smoothScrollThreshold = 1000; 

      if (targetScroll < container.scrollLeft) {
        container.scrollTo({
          left: targetScroll - cellWidth,
          behavior: 'smooth',
        });
      } else if (targetScroll + cellWidth > container.scrollLeft + container.clientWidth) {
        container.scrollTo({
          left: targetScroll - container.clientWidth + cellWidth,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <div className="overflow-x-auto" ref={scrollContainerRef} onMouseUp={handleMouseUp}>
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
                  className="relative px-10 py-8 border border-gray-300 text-left align-top cursor-pointer"
                  onMouseDown={() => handleMouseDown(day, rowIndex)}
                  onMouseEnter={() => handleMouseEnter(day)}
                >
                  {events[rowIndex] &&
                    events[rowIndex].map((event, index) => {
                      const start = Math.min(event.start, event.end);
                      const end = Math.max(event.start, event.end);
                      if (day >= start && day <= end) {
                        return (
                          <div
                            key={index}
                            className="absolute top-2 bottom-2 left-0 right-0 bg-blue-200 opacity-75 rounded"
                            style={{ left: `${(start - 1) * 100}%`, right: `${100 - end * 100}%` }}
                          ></div>
                        );
                      }
                      return null;
                    })}
                  {dragStart !== null && dragEnd !== null && currentRow === rowIndex && day >= Math.min(dragStart, dragEnd) && day <= Math.max(dragStart, dragEnd) && (
                    <div className="absolute top-2 bottom-2 left-0 right-0 bg-blue-300 opacity-50 rounded"></div>
                  )}
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
