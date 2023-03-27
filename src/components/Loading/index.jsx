import P from 'prop-types';
import { Container } from './styled';

export const Loading = ({ isLoading }) => {
  if (!isLoading) return <></>;

  return (
    <Container>
      <div />
      <span>Loading...</span>
    </Container>
  );
};

Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  isLoading: P.bool,
};
