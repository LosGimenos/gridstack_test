import React from 'react';

const ActionButton = ({ buttonText, buttonAction }) => (
  <button onClick={() => {buttonAction()} }>
    {buttonText}
  </button>
);

export default ActionButton;
