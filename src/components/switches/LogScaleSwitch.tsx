import React from 'react';

export interface LogScaleSwitchProps {
  isLogScale: boolean;
  setIsLogScale: (isLogScale: boolean) => void;
}

const LogScaleSwitch: React.SFC<LogScaleSwitchProps> = ({ isLogScale, setIsLogScale }) => {
  return (
    <div className="border border-solid border-black">
      <button
        className={`p-2 focus:outline-none hover:bg-light-turquois ${isLogScale ? '' : 'bg-turquois text-white'}`}
        type="button"
        onClick={() => setIsLogScale(false)}
      >
        Linear Scale
      </button>
      <button
        className={`p-2 border-l border-solid border-black focus:outline-none hover:bg-light-turquois ${
          isLogScale ? 'bg-turquois text-white' : ''
        }`}
        type="button"
        onClick={() => setIsLogScale(true)}
      >
        Log Scale
      </button>
    </div>
  );
};

export default LogScaleSwitch;
