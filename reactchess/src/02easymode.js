import React from 'react';
import '../src/css/easymode.css';
const EasyModeToggle = ({ easyMode, toggleEasyMode }) => {
  return (
    <div>
      <label>
        Easy Mode:
        <input
          type="checkbox"
          checked={easyMode}
          onChange={toggleEasyMode}
        />
      </label>
    </div>
  );
};

export default EasyModeToggle;