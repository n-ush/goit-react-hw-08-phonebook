import React, { Component } from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import Filter from "../../components/Filter/Filter";
import { connect } from "react-redux";
import operations from "../../redux/operations";
import selectors from "../../redux/selectors";

class Contacts extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm />
        <h2>Contacts</h2>
        <Filter />
        <ContactList />
        {this.props.isLoading && <h1>Loading...</h1>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: selectors.getLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchContacts: () => dispatch(operations.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
