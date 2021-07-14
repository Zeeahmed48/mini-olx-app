import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../../store/actions';
import { Link } from 'react-router-dom';
import { db } from '../../config/firebase';
import { auth } from '../../config/firebase';
import defaultAvatar from '../../assets/images/defaultAvatar.png';

const Navbar = () => {
  const [profileImage, setProfileImage] = useState('');
  const [profileName, setProfileName] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const getInitials = (firstName, lastName) => {
    // setProfileName()
    const fname = firstName.charAt(0).toUpperCase();
    const lname = lastName.charAt(0).toUpperCase();
    const fullName = fname + lname;
    setProfileName(fullName);
  };

  useEffect(async () => {
    try {
      const userData = await db
        .collection('users')
        .where('email', '==', user.email)
        .get();
      userData.forEach((doc) => {
        const userProfile = { ...doc.data() };
        setProfileImage(userProfile.imageUrl);
        getInitials(userProfile.firstName, userProfile.lastName);
      });
    } catch (error) {}
  }, [user]);

  const handleSigout = async () => {
    try {
      auth.signOut();
      dispatch(removeUser());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='navbar'>
      <Link to='/' className='brand'>
        Mini<span>Olx</span>
      </Link>
      <ul>
        <li>
          {user && (
            <div className='navbar_user'>
              <button onClick={handleSigout} className='auth_button'>
                Logout
              </button>
              <div className='navbar_user_profile'>
                {profileImage ? (
                  <img src={profileImage} className='navbar_user_image' />
                ) : (
                  <p className='navbar_user_name'>{profileName}</p>
                )}
              </div>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
