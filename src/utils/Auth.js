// src/utils/auth.js
const validUsername = 'admin';
const validPassword = 'password';

export const authenticateUser = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === validUsername && password === validPassword) {
        resolve({ success: true, token: 'dummy-token' });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

export const logout = () => {
  localStorage.removeItem('authToken');
};
