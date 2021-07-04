import { useState, useEffect } from 'react';
import Login from './views/login';
import SignUp from './views/signup';
import { db } from './config/firebase';
import './App.css';

function App() {
  const [screen, setScreen] = useState('login');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    db.collection('users')
      .get()
      .then((users) => {
        users.forEach((doc) => {
          const singleUser = { ...doc.data(), id: doc.id };
          console.log(singleUser);
          const tempUsers = [...allUsers, singleUser];
          setAllUsers(tempUsers);
        });
      });
  }, []);

  setTimeout(() => {}, 5000);
  return (
    <div className='app'>
      {userLoggedIn ? (
        <>
          <div>Dashboard</div>
          <ul>
            {allUsers &&
              allUsers.map((user, index) => {
                return (
                  <li key={index}>
                    {user.id}
                    <br />
                    {user.fullName}
                    <br />
                    {user.email}
                  </li>
                );
              })}
          </ul>
        </>
      ) : (
        <>
          {screen === 'login' ? (
            <>
              <button onClick={() => setScreen('signup')}>
                Create an account
              </button>
              <Login handleLogin={setUserLoggedIn} />
            </>
          ) : screen === 'signup' ? (
            <>
              <button onClick={() => setScreen('login')}>
                Already have an account
              </button>
              <SignUp />
            </>
          ) : (
            ''
          )}
        </>
      )}
    </div>
  );
}

export default App;
