import styles from './ContactsList.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

const ContactListItem = ({ id, name, phone, onRemove }) => {
  return (
    <li className={styles.item}>
      <span className={styles.itemTitle}>
        {name}:{phone}
      </span>{' '}
      <button className={styles.button} onClick={() => onRemove(id)}>
        delete
      </button>
    </li>
  );
};

const ContactsList = ({ contacts, onRemove }) => {
  if (contacts.length === 0) return null;
  return (
    <TransitionGroup component="ul">
      {contacts.map(contact => (
        <CSSTransition id={contact.id} timeout={250} classNames={styles}>
          <ContactListItem {...contact} onRemove={onRemove} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  onRemove: PropTypes.func,
};

export default ContactsList;
