import React from 'react';

// ULTRA SIMPLE TEST VERSION - NO CONSOLE LOGS
export const UserList = () => {
  // Use DOM manipulation instead of console.log (which gets stripped in production)
  React.useEffect(() => {
    // Change document title to prove component loaded
    document.title = '🔥 USERLIST LOADED! 🔥';
    
    // Add a visible element to the page
    const testDiv = document.createElement('div');
    testDiv.id = 'userlist-test-indicator';
    testDiv.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #ff0000;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      font-weight: bold;
      z-index: 9999;
      text-align: center;
    `;
    testDiv.innerHTML = '🔥 USERLIST COMPONENT IS WORKING! 🔥<br/>Click anywhere to continue';
    
    testDiv.onclick = () => {
      testDiv.remove();
    };
    
    document.body.appendChild(testDiv);
    
    // Also show an alert (should work even in production)
    setTimeout(() => {
      alert('🔥 USERLIST COMPONENT LOADED SUCCESSFULLY! 🔥');
    }, 100);
  }, []);
  
  return React.createElement('div', {
    style: {
      padding: '40px',
      backgroundColor: '#ff0000',
      color: 'white',
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: 'bold'
    }
  }, '🔥 USERLIST IS WORKING! 🔥');
};
