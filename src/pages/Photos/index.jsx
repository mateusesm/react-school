import { useEffect, useState } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import P from 'prop-types';
import { useDispatch } from 'react-redux';

import { Loading } from '../../components/Loading';
import * as actions from '../../redux/store/modules/auth/actions';

import axios from '../../services/axios';
import history from '../../services/history';

import { Title, Form } from './styled';
import { Container } from '../../styles/GlobalStyles';

export const Photos = ({ match }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('');

  const id = get(match, 'params.id', '');

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/students/${id}`);
        setProfilePhoto(data, 'Photo[0].url', '');
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        toast.error('Error when try get image!');
        history('/');
      }
    };
    getData();
  }, []);

  const handleChange = async (event) => {
    const photo = event.target.files[0];
    const urlPhoto = URL.createObjectURL(photo);

    setProfilePhoto(urlPhoto);

    const formData = new FormData();
    formData.append('student_id', id);
    formData.append('photo', photo);

    try {
      setIsLoading(true);
      const headers = { 'Content-Type': 'multipart/form-data' };

      await axios.post('/photos/', {
        headers,
        body: formData,
      });

      toast.success('Profile photo updated with success!');

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);

      console.log(err);

      const { status } = get(err, 'response', '');
      toast.error('Error when to send profile photo!');

      if (status === 401) {
        dispatch(actions.loginFail());
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>Photos</Title>

      <Form>
        <label htmlFor="photo">
          {profilePhoto ? (
            <img src={profilePhoto} alt="Profile photo" />
          ) : (
            'Select'
          )}
          <input onChange={handleChange} type="file" id="photo" />
        </label>
      </Form>
    </Container>
  );
};

Photos.propTypes = {
  match: P.shape({}).isRequired,
};
