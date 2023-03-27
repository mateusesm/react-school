import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';

import { Loading } from '../../components/Loading';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../redux/store/modules/auth/actions';

import { getLocalStorage } from '../../services/localStorage';

export const Register = () => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);

  /* const id = useSelector((state) => state.auth.user.id);
  const nameStorage = useSelector((state) => state.auth.user.name);
  const emailStorage = useSelector((state) => state.auth.user.email); */

  const { user } = JSON.parse(getLocalStorage('login'));

  let id = '';
  let nameStorage = '';
  let emailStorage = '';

  if (user) {
    id = user.id;
    nameStorage = user.name;
    emailStorage = user.email;
  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!id) return;

    setName(nameStorage);
    setEmail(emailStorage);
  }, [id, nameStorage, emailStorage]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('Name must be between 3 and 255 characters!');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Invalid email!');
    }

    if (!id && (password.length < 8 || password.length > 255)) {
      formErrors = true;
      toast.error('Password must be between 8 and 50 characters!');
    }

    if (formErrors) return null;

    return dispatch(actions.registerRequest({ id, name, email, password }));
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <Container>
        <h1>{id ? 'Update datas!' : 'Create your account now!'}</h1>

        <Form onSubmit={handleSubmit}>
          <label htmlFor="idName">
            Name:
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              name="name"
              id="idName"
              placeholder="Your name"
            />
          </label>

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

          <button type="submit">Send</button>
        </Form>
      </Container>
    </>
  );
};
