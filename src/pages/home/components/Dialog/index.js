import React from 'react';
import './index.scss';

const Dialog = ({ children, style }) => (
  <div className="chat-bubble" style={{ ...style }}>
    {children}
    <div className="chat-bubble-arrow-border" />
    <div className="chat-bubble-arrow" />
  </div>
);

export default Dialog;
