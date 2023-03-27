import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';

import axios from '../../services/axios';

import { Loading } from '../../components/Loading';
import { Container } from '../../styles/GlobalStyles';
import { StudentContainer, ProfilePicture } from './styled';

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

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Students</h1>

      <StudentContainer>
        {students.map((student) => (
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

            <Link to={`/student/${student.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>
          </div>
        ))}
      </StudentContainer>
    </Container>
  );
};
