import { useState } from 'react';
import { Link } from 'react-router-dom';
import { logIn } from '../../../config/firebase';
import { storeUser } from '../../../store/actions';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const signIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await logIn(email, password);
      dispatch(storeUser(user.user));
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
    setEmail('');
    setPassword('');
  };

  return (
    <div className='login'>
      <form onSubmit={signIn} className='login_form'>
        <input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter your password'
        />
        <button type='submit'>{!isLoading ? 'Login' : 'Please Wait'}</button>
        <p style={{ color: 'red' }}>{errorMessage}</p>
        <Link to={'/signup'} className='auth_link'>
          Create new account
        </Link>
      </form>
    </div>
  );
};

export default Login;
