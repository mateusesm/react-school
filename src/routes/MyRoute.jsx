import { Route, Redirect } from 'react-router-dom';
import P from 'prop-types';
import { useSelector } from 'react-redux';

import { getLocalStorage } from '../services/localStorage';

export const MyRoute = ({ component: Component, isClosed, ...rest }) => {
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const { isLoggedIn } = JSON.parse(getLocalStorage('login'));

  if (isClosed && !isLoggedIn) {
    return (
      <Redirect
        to={{ pathname: '/login', state: { prevPath: rest.location.pathname } }}
      />
    );
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...rest} component={Component} />;
};

MyRoute.defaultProps = {
  isClosed: false,
};

MyRoute.propTypes = {
  component: P.oneOfType([P.element, P.func]).isRequired,
  isClosed: P.bool,
};
