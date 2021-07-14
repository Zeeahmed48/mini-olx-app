import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { db } from '../../../config/firebase';
import { registerUser } from '../../../config/firebase';
import { firebaseStorage } from '../../../config/firebase';
import { storeUser } from '../../../store/actions';
import { useDispatch } from 'react-redux';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const createAcount = async (e) => {
    e.preventDefault();
    let imageUrl = '';
    setIsLoading(true);
    try {
      for (let i = 0; i < profileImage.length; i++) {
        const image = profileImage[i];
        const storageRef = await firebaseStorage.ref(
          `profileImages/${image.name}`
        );
        await storageRef.put(image);
        const url = await storageRef.getDownloadURL();
        imageUrl = url;
      }
      const userCredentials = await registerUser(email, password);
      const user = userCredentials.user;
      db.collection('users')
        .doc(user.uid)
        .set({ email, firstName, lastName, imageUrl });
      dispatch(storeUser(user));
      history.replace('/');
    } catch (error) {
      setErrorMessage(error.message);
      console.log(error);
    }
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    firstName || lastName || email || password || setErrorMessage('');
  }, [firstName, lastName, email, password]);

  return (
    <div className='signup'>
      <form className='signup_form' onSubmit={createAcount}>
        <input
          type='text'
          placeholder='First Name'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type='text'
          placeholder='Last Name'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type='email'
          placeholder='Email Address'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Optional</label>
        <input type='file' onChange={(e) => setProfileImage(e.target.files)} />
        <button type='submit'>{!isLoading ? 'Sign Up' : 'Please Wait'}</button>
        <p style={{ color: 'red' }}>{errorMessage}</p>
        <Link to={'/login'} className='auth_link'>
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
