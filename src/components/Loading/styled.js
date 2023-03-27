import styled from 'styled-components';

import * as colors from '../../config/colors';

export const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.primaryColor};
  font-size: 4rem;

  div {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.8);
  }

  span {
    z-index: 2;
  }
`;
