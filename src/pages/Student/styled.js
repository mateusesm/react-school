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
