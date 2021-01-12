import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const PlayAgain = ({ gameStatus, onClick }) => (
  <div className="game-done">
    <div className="message">
      {gameStatus === 'lost' ? 'Game Over...' : 'Nice!!'}
    </div>
    <Button
      variant="contained"
      color="primary"
      size="large"
      onClick={onClick}
    >
      Play Again
    </Button>
  </div>
);

PlayAgain.propTypes = {
  gameStatus: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PlayAgain;
