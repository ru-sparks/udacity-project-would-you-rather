import React, { Component } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavItem } from "react-bootstrap";
import { Link, Route, Switch } from "react-router-dom";
import Login from "../login/Login";
import AddQuestion from "../protected/AddQuestion";
import { connect } from "react-redux";
import { itemsFetchData } from "../actions/fetchData";
import LeaderBoard from "../protected/LeaderBoard";
import ProtectedRoute from './ProtectedRoute';

class App extends Component {
  componentDidMount() {
    this.props.fetchData("");
  }

  render() {
    let userName = getUserName(this.props);
    console.log('App', this.props);
    console.log('App state', this.state);
    return (
      <div>
        <div>
          <Navbar>
            <Navbar.Brand as={Link} to="/">
              {userName}
            </Navbar.Brand>
            <Navbar.Collapse>
              <Nav className="mr-auto">
                <NavItem eventkey={1} href="/">
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                </NavItem>
                <NavItem eventkey={2} href="/addquestion">
                  <Nav.Link as={Link} to="/addquestion">
                    Add a Question
                  </Nav.Link>
                </NavItem>
                <NavItem eventkey={3} href="/leaderboard">
                  <Nav.Link as={Link} to="/leaderboard">
                    Leaderboard
                  </Nav.Link>
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div>
          <Switch>
            <ProtectedRoute exact path="/addquestion" component={AddQuestion} />
            <ProtectedRoute exact path="/leaderboard" component={LeaderBoard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Login} />
            <Route
              render={() => {
                return <h3>404 Not found</h3>;
              }}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export const getUserName = (props) => {
  let userName = "";
  if (
    props.items &&
    props.items.users &&
    props.authorizedUser &&
    props.items.users[props.authorizedUser]
  ) {
    userName = props.items.users[props.authorizedUser].name;
  }

  return userName;
};
const mapStateToProps = (state) => {
  return {
    items: state.items,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading,
    authorizedUser: state.authorizedUser,
    redirectedPath: state.redirectedPath,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(itemsFetchData(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
