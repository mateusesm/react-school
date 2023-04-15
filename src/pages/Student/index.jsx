import { useState, useEffect } from 'react';
import { get } from 'lodash';
import P from 'prop-types';
import { isEmail, isInt, isFloat } from 'validator';
import { toast } from 'react-toastify';
import { Loading } from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import { Form } from './styled';
import { Container } from '../../styles/GlobalStyles';

export const Student = ({ match }) => {
  const id = get(match, 'params.id', 0);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/students/${id}`);
        const photo = get(data, 'Photos[0].url', '');
        setName(data.name);
        setLastname(data.lastname);
        setEmail(data.email);
        setAge(data.age);
        setWeight(data.weight);
        setHeight(data.height);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) {
          errors.map((error) => toast.error(error));
        }

        history.push('/');
      }
    };

    getData();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('Name must be between 3 and 255 characters!');
    }

    if (lastname.length < 3 || lastname.length > 255) {
      formErrors = true;
      toast.error('Lastname must be between 3 and 255 characters!');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Invalid email!');
    }

    if (!isInt(String(age))) {
      formErrors = true;
      toast.error('Invalid age!');
    }

    if (!isFloat(String(weight))) {
      formErrors = true;
      toast.error('Invalid weight!');
    }

    if (!isFloat(String(height))) {
      formErrors = true;
      toast.error('Invalid height!');
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Update Student' : 'New Student'}</h1>
      <Form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          name=""
          id=""
          value={name}
          placeholder="Student name"
        />
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          name=""
          id=""
          value={lastname}
          placeholder="Student lastname"
        />
        <input
          onChange={(e) => setName(e.target.value)}
          type="email"
          name=""
          id=""
          value={email}
          placeholder="Student email"
        />
        <input
          onChange={(e) => setName(e.target.value)}
          type="number"
          name=""
          id=""
          value={age}
          placeholder="Student age"
        />
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          name=""
          id=""
          value={weight}
          placeholder="Student weight"
        />
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          name=""
          id=""
          value={height}
          placeholder="Student height"
        />
        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
};

Student.propTypes = {
  match: P.shape({}).isRequired,
};
