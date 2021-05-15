import React, { Component } from "react";

import "../App.css";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { authorizeUser } from "../actions/auth";
import { setRedirectedPath } from "../actions/redirect";

class Login extends Component {
  oneOff = 0;
  onSelectionChange = (event) => {
    console.log(event.target.selectedIndex);

    let index = event.target.selectedIndex - this.oneOff;

    if (index >= 0) {
      this.props.authorizeUser(getUser(this.props.users, index).id);
      debugger;
      if (this.props.redirectedPath) {
        this.props.setRedirectedPath("");
        this.props.history.push(this.props.redirectedPath);
      }
    } else {
      this.props.authorizeUser(null);
    }
  };
  render() {
    let page = <></>;
    let caption = "Loading...";
    const notAuthorized = "";
    this.oneOff = 0;
    if (this.props.users) {
      caption = "Pick a user...";
      page = Object.entries(this.props.users).map((element, index) => {
        return (
          <option key={element[1].id} id={element[1].id} value={element[1].id}>
            {element[1].name}
          </option>
        );
      });
      if (!this.props.authorizedUser) {
        this.oneOff = 1;
        page.unshift(
          <option key={notAuthorized} id={notAuthorized} value={notAuthorized}>
            {notAuthorized}
          </option>
        );
      }
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
                placeholder="Search"
                value={
                  this.props.authorizedUser === undefined
                    ? notAuthorized
                    : this.props.authorizedUser
                }
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
    authorizedUser: state.authorizedUser,
    redirectedPath: state.redirectedPath,
  };
};

export const getUser = (usersObject, index) => {
  let users = Object.entries(usersObject);
  if (index < users.length && index >= 0) {
    return users[index][1];
  } else {
    return undefined;
  }
};

export default connect(mapStateToProps, { authorizeUser, setRedirectedPath })(
  Login
);
