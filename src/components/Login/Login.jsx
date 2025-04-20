import React, { useState } from 'react';
import styles from './Login.module.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

function Login({ setUsername, username, setIsConnected }) {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('noteAppUsers')) || [];

    const userExists = users.find(
      (user) => user.username === username && user.password === password
    );

    if (userExists) {
      alert('Login successful!');
      setIsConnected(true);
      setUsername(username);

    } else {
      alert('Incorrect username or password');
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('noteAppUsers')) || [];

    const userExists = users.find((user) => user.username === username);

    if (userExists) {
      alert('Username already exists!');
      return;
    }

    users.push({ username, email, password });
    localStorage.setItem('noteAppUsers', JSON.stringify(users));
    alert('Signup successful!');
    setIsConnected(true);
    setUsername(username);
  };

  return (
    <div className={styles.LoginPage}>
      <div className={styles.wrapper}>
        {isLoginPage ? (
          <form id="loginForm" onSubmit={handleLoginSubmit}>
            <h1>Login</h1>
            <div className={styles.inputBox}>
              <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FaUser className={styles.icon} />
            </div>
            <div className={styles.inputBox}>
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <RiLockPasswordFill className={styles.icon} />
            </div>
            <button type="submit" className={styles.btn}>
              Login
            </button>
            <div className={styles.registerLink}>
              <p>
                Don't have an account?{' '}
                <a onClick={() => setIsLoginPage(false)} style={{ cursor: 'pointer' }}>
                  Sign up
                </a>
              </p>
            </div>
          </form>
        ) : (
          <form id="signupForm" onSubmit={handleSignupSubmit}>
            <h1>Sign Up</h1>
            <div className={styles.inputBox}>
              <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FaUser className={styles.icon} />
            </div>
            <div className={styles.inputBox}>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MdEmail className={styles.icon} />
            </div>
            <div className={styles.inputBox}>
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <RiLockPasswordFill className={styles.icon} />
            </div>
            <button type="submit" className={styles.btn}>
              Sign Up
            </button>
            <div className={styles.registerLink}>
              <p>
                Already have an account?{' '}
                <a onClick={() => setIsLoginPage(true)} style={{ cursor: 'pointer' }}>
                  Login
                </a>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
