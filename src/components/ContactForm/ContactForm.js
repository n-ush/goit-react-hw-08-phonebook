import React, { Component } from "react";
import { connect } from "react-redux";
import shortid from "shortid";
import styles from "./ContactForm.module.css";
import operations from "../../redux/operations";
import selectors from "../../redux/selectors";

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  nameInputId = shortid.generate();
  numberInputId = shortid.generate();

  handleInputChange = (event) => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { contacts, onSubmit } = this.props;
    const { name, number } = this.state;

    contacts.find((contact) => contact.name === name)
      ? alert(`${name} is already in contacts`)
      : contacts.find((contact) => contact.number === number)
      ? alert(`${number} is already in contacts`)
      : onSubmit(this.state);

    this.reset();
  };

  reset = () => {
    this.setState({ name: "", number: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <label htmlFor={this.nameInputId}>Name</label>
        <input
          value={this.state.name}
          type="text"
          name="name"
          id={this.nameInputId}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          onChange={this.handleInputChange}
          className={styles.input}
        />

        <label htmlFor={this.numberInputId}>Number</label>
        <input
          value={this.state.number}
          id={this.numberInputId}
          onChange={this.handleInputChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          className={styles.input}
        />

        <button type="submit" className={styles.btn}>
          Add contact
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  contacts: selectors.getFilteredContacts(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (name, number) => dispatch(operations.addContact(name, number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
