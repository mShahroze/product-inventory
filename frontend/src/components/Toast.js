import React, { useState, useEffect } from 'react';

const Toast = ({ message, type = 'success', duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div className={`toast ${type} ${isVisible ? 'show' : ''}`}>
      {message}
    </div>
  );
};

export default Toast;
