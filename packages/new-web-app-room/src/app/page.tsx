'use client';

import { useState, useEffect } from 'react';
import { ThemeToggle } from './components/ThemeToggle';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { key } = event;
      
      if (key >= '0' && key <= '9') {
        inputNumber(key);
      } else if (key === '.') {
        inputDecimal();
      } else if (key === '+') {
        inputOperation('+');
      } else if (key === '-') {
        inputOperation('-');
      } else if (key === '*') {
        inputOperation('×');
      } else if (key === '/') {
        event.preventDefault();
        inputOperation('÷');
      } else if (key === 'Enter' || key === '=') {
        performCalculation();
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clear();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [display, previousValue, operation, waitingForOperand]);

  const Button = ({ 
    onClick, 
    className = '', 
    children 
  }: { 
    onClick: () => void; 
    className?: string; 
    children: React.ReactNode; 
  }) => (
    <button
      onClick={onClick}
      className={`h-16 text-xl font-medium rounded-lg transition-all duration-200 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm transition-colors duration-300">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Calculator</h1>
          <ThemeToggle />
        </div>

        {/* Display */}
        <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-6 transition-colors duration-300">
          <div className="text-right text-3xl font-mono text-gray-900 dark:text-white overflow-hidden">
            {display}
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <Button
            onClick={clear}
            className="col-span-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white"
          >
            Clear
          </Button>
          <Button
            onClick={() => inputOperation('÷')}
            className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white"
          >
            ÷
          </Button>
          <Button
            onClick={() => inputOperation('×')}
            className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white"
          >
            ×
          </Button>

          {/* Row 2 */}
          <Button
            onClick={() => inputNumber('7')}
            className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
          >
            7
          </Button>
          <Button
            onClick={() => inputNumber('8')}
            className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
          >
            8
          </Button>
          <Button
            onClick={() => inputNumber('9')}
            className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
          >
            9
          </Button>
          <Button
            onClick={() => inputOperation('-')}
            className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white"
          >
            -
          </Button>

          {/* Row 3 */}
          <Button
            onClick={() => inputNumber('4')}
            className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
          >
            4
          </Button>
          <Button
            onClick={() => inputNumber('5')}
            className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
          >
            5
          </Button>
          <Button
            onClick={() => inputNumber('6')}
            className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
          >
            6
          </Button>
          <Button
            onClick={() => inputOperation('+')}
            className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white"
          >
            +
          </Button>

          {/* Row 4 */}
          <Button
            onClick={() => inputNumber('1')}
            className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
          >
            1
          </Button>
          <Button
            onClick={() => inputNumber('2')}
            className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
          >
            2
          </Button>
          <Button
            onClick={() => inputNumber('3')}
            className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
          >
            3
          </Button>
          <Button
            onClick={performCalculation}
            className="row-span-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
          >
            =
          </Button>

          {/* Row 5 */}
          <Button
            onClick={() => inputNumber('0')}
            className="col-span-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
          >
            0
          </Button>
          <Button
            onClick={inputDecimal}
            className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
          >
            .
          </Button>
        </div>

        {/* Keyboard hint */}
        <div className="mt-4 text-center text-gray-500 dark:text-gray-400 text-sm">
          You can also use your keyboard!
        </div>
      </div>
    </div>
  );
}












