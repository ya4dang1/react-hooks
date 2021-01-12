import PropTypes from 'prop-types';
import * as mathUtil from '../../../static/utils/math';

const StarDisplay = ({ count }) => (
  <>
    {mathUtil.range(1, count).map((starId) => (
      <div key={starId} className="star" />
    ))}
  </>
);

StarDisplay.propTypes = {
  count: PropTypes.number,
};

StarDisplay.defaultProps = {
  count: undefined,
};

export default StarDisplay;
