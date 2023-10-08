import React from 'react';

const EasyModeToggle = ({ easyMode, toggleEasyMode }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={easyMode}
        onChange={toggleEasyMode}
      />
      Easy Mode
    </div>
  );
};

export default EasyModeToggle;