import React, { useState } from 'react';
import Card from './components/Card';
import dayjs from 'dayjs';

function App() {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(dayjs());

  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);
  };


  return (
    <div className="App">
      <header className="App-header p-4 bg-blue-500 text-white text-center flex justify-between items-center">
        <h1 className="text-2xl font-bold cursor-pointer" onClick={toggleCardVisibility}>
          {currentDate.format('MMMM YYYY')}
        </h1>
        
      </header>
      {isCardVisible && <Card currentDate={currentDate} onClose={toggleCardVisibility} />}
      
    </div>
  );
}

export default App;
