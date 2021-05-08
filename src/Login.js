import React, { Component } from "react";

import logo from "./logo.svg";
import "./App.css";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { authorizeUser } from "./actions/auth";

class Login extends Component {
  onSelectionChange = (event) => {
    console.log(event.target.selectedIndex)

    let index = event.target.selectedIndex - 1;

    if (index >= 0) {
//      this.props.authorizeUser(Object.entries(this.props.users)[index][1].id);
        this.props.authorizeUser(getUser(this.props.users, index).id);
  
    } else {
      this.props.authorizeUser(null);
    }
    ;
  };
  render() {
    let page = <></>;
    let caption = "Loading...";
    const notAuthorized = "Not Authorized";
    debugger;
    if (this.props.users) {
      caption = "Pick a user...";
      debugger;
      page = Object.entries(this.props.users).map((element, index) => {
        return (
          <option key={element[1].id} id={element[1].id} value={element[1].id}>
            {element[1].name}
          </option>
        );
      });
      page.unshift(
        <option key={notAuthorized} id={notAuthorized} value={notAuthorized}>
          {notAuthorized}
        </option>);
    }

    return (
      <div className="App">
        <header className="App-header">
          <Form>
            <Form.Group controlId="loginForm.Select">
              <Form.Label>{caption}</Form.Label>
              <Form.Control
                size="sm"
                as="select"
                value={this.props.authorizedUser === undefined ? notAuthorized : this.props.authorizedUser}
                onChange={this.onSelectionChange}
              >
                {page}
              </Form.Control>
            </Form.Group>
          </Form>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => { 
  return {
    users: state.items.users,
    authorizedUser: state.authorizedUser
  };
};

export const getUser = (usersObject, index) => {
  let users = Object.entries(usersObject);
  if (index < users.length && index >= 0) {
    return users[index][1];
  } else {
    return undefined;
  }
}

export default connect(mapStateToProps, {authorizeUser})(Login);
