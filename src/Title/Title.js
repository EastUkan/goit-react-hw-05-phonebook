import styles from './Title.module.css';
import PropTypes from 'prop-types';

const Title = ({ title }) => {
  return <h2 className={styles.title}>{title}</h2>;
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
