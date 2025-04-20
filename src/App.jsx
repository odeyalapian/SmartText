import React, { useState } from 'react';
import styles from './App.module.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsername] = useState('');
  
  
  return (
    <div className={styles.appWrapper}>
      {isConnected ? (
        <Home username={username} setIsConnected={setIsConnected}/>
      ) : (
        <Login setIsConnected={setIsConnected} setUsername={setUsername} username={username}/>
      )}
    </div>
  );
}

export default App;
