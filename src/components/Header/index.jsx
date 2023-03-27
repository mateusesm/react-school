import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Nav } from './styled';

export const Header = () => {
  return (
    <Nav>
      <Link to="/">
        <FaHome size={25} />
      </Link>

      <Link to="/register">
        <FaUserAlt size={25} />
      </Link>

      <Link to="/login">
        <FaSignInAlt size={25} />
      </Link>
    </Nav>
  );
};
