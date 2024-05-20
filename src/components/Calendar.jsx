import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';

const Calendar = ({ currentDate }) => {
  if (!currentDate || !dayjs.isDayjs(currentDate)) {
    return null;
  }

  const daysInMonth = currentDate.daysInMonth();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const resourceLabels = Array.from({ length: 15 }, (_, i) => `Resource ${String.fromCharCode(65 + i)}`);

  // colors for each row
  const eventColors = [
    "#f28b82", "#fbbc04", "#fff475", "#ccff90", "#a7ffeb", 
    "#cbf0f8", "#aecbfa", "#d7aefb", "#fdcfe8", "#e6c9a8", 
    "#e8eaed", "#ccff90", "#a7ffeb", "#fbbc04", "#f28b82"
  ];

  const [events, setEvents] = useState(() => {
    const storedEvents = sessionStorage.getItem('calendarEvents');
    return storedEvents ? JSON.parse(storedEvents) : {};
  });

  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [eventBeingMoved, setEventBeingMoved] = useState(null);
  const scrollContainerRef = useRef(null);

  // useEffect to save events to session storage
  useEffect(() => {
    sessionStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const handleMouseDown = (day, rowIndex, eventIndex = null) => {
    setIsDragging(true);
    setDragStart(day);
    setDragEnd(day);
    setCurrentRow(rowIndex);
    if (eventIndex !== null) {
      setIsMoving(true);
      setEventBeingMoved({ index: eventIndex, originalStart: events[rowIndex][eventIndex].start });
    }
  };

  const handleMouseUp = () => {
    if (dragStart !== null && dragEnd !== null && currentRow !== null) {
      if (isMoving && eventBeingMoved !== null) {
        const distance = dragEnd - eventBeingMoved.originalStart;
        moveEvent(currentRow, eventBeingMoved.index, distance);
      } else if (dragStart !== dragEnd) {
        addNewEvent();
      }
    }
    resetDragging();
  };

  const handleMouseEnter = (day) => {
    if (isDragging) {
      setDragEnd(day);
    }
  };

  const moveEvent = (rowIndex, eventIndex, distance) => {
    setEvents((prevEvents) => {
      let eventsInRow = [...prevEvents[rowIndex]];
      let event = { ...eventsInRow[eventIndex] };
      const newStart = event.start + distance;
      const newEnd = event.end + distance;
      // Prevent overlapping
      if (canMoveEvent(eventsInRow, eventIndex, newStart, newEnd)) {
        event.start = newStart;
        event.end = newEnd;
        eventsInRow[eventIndex] = event;
      }
      return { ...prevEvents, [rowIndex]: eventsInRow };
    });
  };

  const canMoveEvent = (eventsInRow, currentIndex, newStart, newEnd) => {
    return eventsInRow.every((evt, idx) => {
      if (idx === currentIndex) return true; // Ignore self in overlap check
      return newEnd < evt.start || newStart > evt.end;
    });
  };

  const addNewEvent = () => {
    setEvents((prevEvents) => {
      const rowEvents = prevEvents[currentRow] || [];
      return {
        ...prevEvents,
        [currentRow]: [...rowEvents, { start: Math.min(dragStart, dragEnd), end: Math.max(dragStart, dragEnd), name: 'New Event', color: eventColors[currentRow] }],
      };
    });
  };

  const resetDragging = () => {
    setDragStart(null);
    setDragEnd(null);
    setCurrentRow(null);
    setIsDragging(false);
    setIsMoving(false);
    setEventBeingMoved(null);
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
                  onMouseUp={handleMouseUp}  // Ensuring mouse up is captured everywhere
                >
                  {events[rowIndex] &&
                    events[rowIndex].map((event, index) => {
                      if (day >= event.start && day <= event.end) {
                        return (
                          <div
                            key={index}
                            className="absolute top-2 bottom-2 left-0 right-0"
                            style={{
                              backgroundColor: event.color,
                              opacity: 0.75,
                              borderRadius: '4px'
                            }}
                          >
                            {day === event.start && <span>{event.name}</span>}
                          </div>
                        );
                      }
                      return null;
                    })}
                  {isDragging && currentRow === rowIndex && day >= Math.min(dragStart, dragEnd) && day <= Math.max(dragStart, dragEnd) && (
                    <div className="absolute top-2 bottom-2 left-0 right-0 bg-blue-300 opacity-50 rounded" style={{ left: 0, width: '100%' }}></div>
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
