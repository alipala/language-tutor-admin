import React from 'react';

// ULTRA SIMPLE TEST VERSION
export const UserList = () => {
  console.log('🔥 USERLIST COMPONENT LOADED!');
  alert('🔥 USERLIST COMPONENT LOADED!');
  
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
