import React from 'react';

const TestApp: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Application</h1>
      <p>This is a test to see if React is rendering correctly.</p>
      <button onClick={() => alert('Button clicked!')}>Click Me</button>
    </div>
  );
};

export default TestApp;
