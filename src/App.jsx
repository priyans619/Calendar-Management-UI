import React, { useState } from 'react';
import Card from './components/Card';
import Calendar from './components/Calendar';
import dayjs from 'dayjs';

function App() {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(dayjs());

  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);
  };

  const handlePreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  const handleToday = () => {
    setCurrentDate(dayjs());
  };

  return (
    <div className="App">
      <header className="App-header p-4 bg-blue-500 text-white text-center flex justify-between items-center">
        <h1 className="text-2xl font-bold cursor-pointer" onClick={toggleCardVisibility}>
          {currentDate.format('MMMM YYYY')}
        </h1>
        <div className="flex space-x-2 items-center">
          <button onClick={handlePreviousMonth} className="text-white hover:text-gray-300">
            &lt;
          </button>
          <button onClick={handleToday} className="text-white hover:text-gray-300">
            Today
          </button>
          <button onClick={handleNextMonth} className="text-white hover:text-gray-300">
            &gt;
          </button>
        </div>
      </header>
      {isCardVisible && <Card currentDate={currentDate} onClose={toggleCardVisibility} />}
      <Calendar currentDate={currentDate} />
    </div>
  );
}

export default App;
