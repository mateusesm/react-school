import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaCircle,
  FaPowerOff,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { Nav } from './styled';
import { getLocalStorage } from '../../services/localStorage';

import history from '../../services/history';
import * as actions from '../../redux/store/modules/auth/actions';

export const Header = () => {
  const { isLoggedIn } = JSON.parse(getLocalStorage('login'));
  const dispatch = useDispatch();

  const handleLogout = (event) => {
    event.preventDefault();

    dispatch(actions.loginFail());
    history.push('/');
    window.location.reload(true);
  };

  return (
    <Nav>
      <Link to="/">
        <FaHome size={25} />
      </Link>

      <Link to="/register">
        <FaUserAlt size={25} />
      </Link>

      {isLoggedIn ? (
        <>
          <Link onClick={handleLogout} to="/logout">
            <FaPowerOff size={25} color="#fff" />
          </Link>
          <FaCircle size={25} color="#66ff33" />
        </>
      ) : (
        <Link to="/login">
          <FaSignInAlt size={25} />
        </Link>
      )}
    </Nav>
  );
};
