import React from 'react';

const ActionButton = ({ buttonText, buttonAction, style }) => (
  <button className={style} onClick={() => {buttonAction()} }>
    {buttonText}
  </button>
);

export default ActionButton;
