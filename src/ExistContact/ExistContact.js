import PropTypes from 'prop-types';
import styles from './ExistContact.module.css';

const ExistContact = ({ title }) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
    </div>
  );
};

ExistContact.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ExistContact;
