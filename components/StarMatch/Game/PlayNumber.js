import PropTypes from 'prop-types';

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

const PlayNumber = ({ status, number, onClick }) => (
  <>
    <button
      type="button"
      onClick={() => onClick(number, status)}
      className="number"
      style={{
        backgroundColor: colors[status],
      }}
    >
      {number}
    </button>
  </>
);

PlayNumber.propTypes = {
  status: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PlayNumber;
