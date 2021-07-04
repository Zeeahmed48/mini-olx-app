import { useState } from 'react';
import { logIn } from '../../config/firebase';
import loader from '../../assets/loader.webp';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const signIn = async () => {
    setIsloading(true);
    try {
      const user = await logIn(email, password);
      setIsloading(false);
      handleLogin(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <div>
        <br />
        <input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email'
        />
        <br />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter your password'
        />
        <br />
        {isLoading ? (
          <img
            src={loader}
            // width='30px'
            //  height='30px'
          />
        ) : (
          <button onClick={signIn}>Login</button>
        )}

        <br />
        <p style={{ color: 'red' }}>{errorMessage}</p>
      </div>
    </div>
  );
};

export default Login;
