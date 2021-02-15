import styles from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ filter, onChange }) => {
  return (
    <input
      className={styles.input}
      type="text"
      name="filter"
      value={filter}
      onChange={({ target }) => onChange(target.value)}
      placeholder="Enter name for Search"
    ></input>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
