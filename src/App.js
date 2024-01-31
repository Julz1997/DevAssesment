import React, { useState, useEffect } from 'react';

const EpicSumUpDemo = () => {
  const [timeSpent, setTimeSpent] = useState('0h');
  const [originalEstimate, setOriginalEstimate] = useState('8h'); 
  const [progressBarValue, setProgressBarValue] = useState(0);

  useEffect(() => {
    const calculatedProgressBarValue = calculateProgressBarValue(parseTime(timeSpent), parseTime(originalEstimate));
    setProgressBarValue(calculatedProgressBarValue);
  }, [timeSpent, originalEstimate]);

  const calculateProgressBarValue = (timeSpent, originalEstimate) => {
    return (timeSpent / originalEstimate) * 100;
  };

  const parseTime = (timeString) => {
    const timeArray = timeString.match(/\d+/g);
    if (!timeArray || timeArray.length === 0) return 0;

    const hours = parseInt(timeArray[0], 10);
    return hours;
  };

  const formatTime = (hours) => {
    const days = Math.floor(hours / 8);
    const remainingHours = hours % 8;
    return `${days > 0 ? `${days}d ` : ''}${remainingHours > 0 ? `${remainingHours}h` : ''}`;
  };

  const increaseTime = (field) => {
    const currentValue = parseTime(field === 'timeSpent' ? timeSpent : originalEstimate);
    const newValue = currentValue + 1;
    const updatedTime = `${newValue}h`;
    field === 'timeSpent' ? setTimeSpent(updatedTime) : setOriginalEstimate(updatedTime);
  };

  const decreaseTime = (field) => {
    const currentValue = parseTime(field === 'timeSpent' ? timeSpent : originalEstimate);
    const newValue = Math.max(currentValue - 1, 0);
    const updatedTime = `${newValue}h`;
    field === 'timeSpent' ? setTimeSpent(updatedTime) : setOriginalEstimate(updatedTime);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Epic Sum Up Demo</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ margin: '10px' }}>
          <label>Time Spent:</label>
          <input type="text" value={timeSpent} onChange={(e) => setTimeSpent(e.target.value)} />
          <button onClick={() => increaseTime('timeSpent')}>+</button>
          <button onClick={() => decreaseTime('timeSpent')}>-</button>
          <p>Time Spent: {timeSpent}</p>
        </div>

        <div style={{ margin: '10px' }}>
          <label>Original Estimate:</label>
          <input type="text" value={originalEstimate} onChange={(e) => setOriginalEstimate(e.target.value)} />
          <button onClick={() => increaseTime('originalEstimate')}>+</button>
          <button onClick={() => decreaseTime('originalEstimate')}>-</button>
          <p>Remaining: {formatTime(parseTime(originalEstimate) - parseTime(timeSpent))}</p>
          <p>Time Budget: {formatTime(parseTime(originalEstimate) - parseTime(timeSpent))}</p>
          <p>Original Estimate: {originalEstimate}</p>
        </div>
      </div>

      <div style={{ width: '15%', height: '20px', backgroundColor: 'lightgray', position: 'relative', margin: '10px auto' }}>
        <div style={{ width: `${progressBarValue}%`, height: '100%', backgroundColor: 'green', position: 'absolute' }} />
        <div style={{ position: 'absolute', right: 0, top: '25%' }}>{originalEstimate}</div>
      </div>
    </div>
  );
};

export default EpicSumUpDemo;
