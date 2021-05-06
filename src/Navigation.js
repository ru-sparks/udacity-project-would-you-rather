import React, { Component } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { NavItem } from "react-bootstrap";
import { Link, Route, Switch } from "react-router-dom";
import Login from "./Login";
import AddQuestion from './AddQuestion';

class Navigation extends Component {
  render() {
    return (
      <div>
        <div>
          <Navbar>
            <Navbar.Brand as={Link} to="/">
              React-Bootstrap
            </Navbar.Brand>
            <Navbar.Collapse>
              <Nav className="mr-auto">
              <NavItem eventkey={1} href="/">
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                </NavItem>
                <NavItem eventkey={1} href="/addquestion">
                  <Nav.Link as={Link} to="/addquestion">
                    Add a Question
                  </Nav.Link>
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div>
          <Switch>
            <Route exact path="/addquestion" component={AddQuestion} />
            <Route exact path="/" component={Login} />
            <Route
              render={function () {
                return <p>Not found</p>;
              }}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Navigation;
