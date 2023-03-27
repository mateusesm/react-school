import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${primaryColor};
  padding: 20px;

  a {
    color: #fff;
    margin: 0 10px 0 0;
    font-weight: bolder;
  }
`;
