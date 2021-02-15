import { Component } from 'react';

import styles from './ContactForm.module.css';
import PropTypes from 'prop-types';

import { v4 as uuidv4 } from 'uuid';

const INITIAL_STATE = {
  id: '',
  name: '',
  phone: '',
};

class ContactForm extends Component {
  state = INITIAL_STATE;

  handleChangeForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    const { name, phone } = this.state;
    const { onAdd } = this.props;

    const isValidatedForm = this.validateForm();

    if (!isValidatedForm) return;
    onAdd({ id: uuidv4(), name, phone });
    this.resetForm();
  };

  validateForm = () => {
    const { name, phone } = this.state;
    const { onCheckUnique } = this.props;
    if (!name || !phone) {
      alert('Some filed is empry');
      return false;
    }

    return onCheckUnique(name);
  };

  resetForm = () => this.setState(INITIAL_STATE);

  render() {
    const { name, phone } = this.state;
    return (
      <form className={styles.form} onSubmit={this.handleFormSubmit}>
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Enter name"
          value={name}
          onChange={this.handleChangeForm}
        />
        <input
          className={styles.input}
          type="tel"
          name="phone"
          placeholder="Enter phone number"
          value={phone}
          onChange={this.handleChangeForm}
        />
        <button className={styles.button} type="submit">
          Add Contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onAdd: PropTypes.func,
  onCheckUnique: PropTypes.func,
};

export default ContactForm;
