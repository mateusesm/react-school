import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa';

import { toast } from 'react-toastify';
import axios from '../../services/axios';

import { Loading } from '../../components/Loading';
import { Container } from '../../styles/GlobalStyles';
import { StudentContainer, ProfilePicture, NewStudent } from './styled';

export const Students = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getStudentsDatas = useCallback(async () => {
    setIsLoading(true);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
    const { data } = await axios.get('/students');
    setStudents(() => [...data]);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getStudentsDatas();
  }, [getStudentsDatas]);

  const handleDeleteAsk = (event) => {
    event.preventDefault();

    const exclamation = event.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    event.currentTarget.remove();
  };

  const handleDelete = async (event, studentId, index) => {
    event.persist();
    try {
      setIsLoading(true);
      await axios.delete(`students/${studentId}`);

      const newStudents = [...students];
      newStudents.splice(index, 1);
      setStudents(newStudents);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const status = get(err, 'response.status', 0);

      if (status === 401) {
        toast.error('You must do login!');
      } else {
        toast.error('Error for exclude student!');
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Students</h1>

      <NewStudent to="/student/">New Student</NewStudent>

      <StudentContainer>
        {students.map((student, index) => (
          <div key={String(student.id)}>
            <ProfilePicture>
              {get(student, `Photos[0].url`, false) ? (
                <img src={student.Photos[0].url} alt="Foto do aluno" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>

            <span>{student.name}</span>
            <span>{student.email}</span>

            <Link to={`/student/${student.id}/edit`}>
              <FaEdit size={16} />
            </Link>

            <Link
              onClick={handleDeleteAsk}
              to={`/student/${student.id}/delete`}
            >
              <FaWindowClose size={16} />
            </Link>

            <FaExclamation
              onClick={(event) => handleDelete(event, student.id, index)}
              size={16}
              display="none"
              cursor="pointer"
            />
          </div>
        ))}
      </StudentContainer>
    </Container>
  );
};
