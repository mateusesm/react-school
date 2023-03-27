import { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../redux/store/modules/auth/actions';

import { Loading } from '../../components/Loading';

import { Form } from './styled';
import { Container } from '../../styles/GlobalStyles';

export const Login = (props) => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);

  const prevPath = get(props, 'location.state.prevPath', '/');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Invalid email!');
    }

    if (password.length < 8 || password.length > 255) {
      formErrors = true;
      toast.error('Invalid password!');
    }

    if (formErrors) return null;

    return dispatch(actions.loginRequest({ email, password, prevPath }));
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Login</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="idEmail">
          E-mail:
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            name="email"
            id="idEmail"
            placeholder="Your e-mail"
          />
        </label>

        <label htmlFor="idPassword">
          Password:
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            name="password"
            id="idPassword"
            placeholder="Your password"
          />
        </label>

        <button type="submit">Login</button>
      </Form>
    </Container>
  );
};
