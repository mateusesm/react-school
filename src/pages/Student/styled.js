import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  input {
    height: 40px;
    margin-bottom: 20px;
    border: 2px solid #ddd;
    border-radius: 4px;
    padding: 0 10px;

    &:focus {
      border-color: ${colors.primaryColor};
    }
  }
`;

export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;
  position: relative;
  margin-top: 20px;

  img {
    width: 160px;
    height: 160px;
    border-radius: 50%;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    position: absolute;
    bottom: 0;
    color: #fff;
    background-color: ${colors.primaryColor};
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;

export const Title = styled.h1`
  text-align: center;
`;
