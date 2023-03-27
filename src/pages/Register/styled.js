import styled from 'styled-components';

import * as colors from '../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 10px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  input {
    height: 40px;
    font-size: 1rem;
    border: 2px solid #ddd;
    padding: 0 10px;
    border-radius: 4px;

    &:focus {
      border-color: ${colors.primaryColor};
    }
  }
`;
