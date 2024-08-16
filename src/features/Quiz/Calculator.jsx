// src/Calculator.js
import React, { useState, useEffect } from 'react';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [memory, setMemory] = useState(0);

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        setResult(eval(input) || '');
      } catch {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === 'CE') {
      setInput(input.slice(0, -1));
    } else if (value === 'M+') {
      setMemory(memory + parseFloat(result || 0));
    } else if (value === 'M-') {
      setMemory(memory - parseFloat(result || 0));
    } else if (value === 'MR') {
      setInput(memory.toString());
    } else if (value === 'MC') {
      setMemory(0);
    } else {
      setInput(input + value);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;
      if (['+', '-', '*', '/'].includes(key)) {
        handleButtonClick(key);
      } else if (key === 'Enter') {
        handleButtonClick('=');
      } else if (key === 'Backspace') {
        handleButtonClick('CE');
      } else if (key === 'Escape') {
        handleButtonClick('C');
      } else if (!isNaN(key) || key === '.') {
        handleButtonClick(key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [input, result, memory]);

  return (
    <div className="w-full h-full  flex flex-col bg-white p-4 rounded-lg shadow-lg">
      <div className="flex w-full flex-col mb-4">
        <input
          type="text"
          value={input}
          readOnly
          className="w-full outline-none  text-right text-2xl border p-2 ring-1 ring-[#0000001a]    transition rounded  mb-2"
        />
        <div className="text-right text-3xl text-gray-700">{result}</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((item) => (
          <button
            key={item}
            onClick={() => handleButtonClick(item)}
            className="p-1 text-xl ring-1 ring-[#0000001a]  hover:bg-gray-300 rounded  transition"
          >
            {item}
          </button>
        ))}
        <button
          onClick={() => handleButtonClick('C')}
          className="col-span-2 p-3 text-xl bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          C
        </button>
        <button
          onClick={() => handleButtonClick('CE')}
          className="p-3 text-xl bg-yellow-400 rounded-lg hover:bg-yellow-500 transition"
        >
          CE
        </button>
        <button
          onClick={() => handleButtonClick('M+')}
          className="p-3 text-xl bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          M+
        </button>
        <button
          onClick={() => handleButtonClick('M-')}
          className="p-3 text-xl bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          M-
        </button>
        <button
          onClick={() => handleButtonClick('MR')}
          className="p-3 text-xl bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          MR
        </button>
        <button
          onClick={() => handleButtonClick('MC')}
          className="p-3 text-xl bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          MC
        </button>
      </div>
    </div>
  );
};

export default Calculator;
