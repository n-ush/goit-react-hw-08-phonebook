import React from "react";
import { connect } from "react-redux";
import styles from "./ContactList.module.css";
import PropTypes from "prop-types";
import operations from "../../redux/operations";
import selectors from "../../redux/selectors";

const ContactList = ({ contacts, onDelete }) => (
  <ul className={styles.list}>
    {contacts.map(({ id, name, number }) => (
      <li key={id} className={styles.list_item}>
        <div className={styles.contact}>
          <p>{name}:</p>
          <p>{number}</p>
        </div>
        <button onClick={() => onDelete(id)}>Delete</button>
      </li>
    ))}
  </ul>
);

const mapStateToProps = (state) => ({
  contacts: selectors.getFilteredContacts(state),
});

const mapDispatchToProps = (dispatch) => ({
  onDelete: (id) => dispatch(operations.deleteContact(id)),
});

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
