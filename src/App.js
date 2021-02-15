import { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import Title from './Title/Title';
import ExistContact from './ExistContact/ExistContact';
import './App.css';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    error: false,
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;
    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  handleAddContact = newContact =>
    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));

  handleCheckUniqueContact = name => {
    const { contacts } = this.state;

    const isExistContact = !!contacts.find(contact => contact.name === name);

    isExistContact && this.setState({ error: true });
    this.showPopup();

    return !isExistContact;
  };

  showPopup = () => setTimeout(() => this.setState({ error: false }), 2000);

  handleRemoveContact = id =>
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));

  handleFilterChange = filter => this.setState({ filter });

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  render() {
    const { filter, error } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <>
        <div className="container">
          <CSSTransition
            in={true}
            appear={true}
            classNames="transition"
            timeout={500}
            unmountOnExit
          >
            <Title title="Form Contact" />
          </CSSTransition>

          <ContactForm
            onAdd={this.handleAddContact}
            onCheckUnique={this.handleCheckUniqueContact}
          />
          <Title title="Contacts List" />

          <Filter filter={filter} onChange={this.handleFilterChange} />

          <ContactsList
            contacts={visibleContacts}
            onRemove={this.handleRemoveContact}
          />
          <CSSTransition
            in={error}
            appear={true}
            classNames="transition"
            timeout={250}
            unmountOnExit
          >
            <ExistContact title="Contact is already exist" />
          </CSSTransition>
        </div>
      </>
    );
  }
}
