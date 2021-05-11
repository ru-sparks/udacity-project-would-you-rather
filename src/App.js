import React, { Component } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavItem } from "react-bootstrap";
import { Link, Route, Switch } from "react-router-dom";
import Login from "./main-menu-components/Login";
import AddQuestion from "./main-menu-components/AddQuestion";
import { connect } from "react-redux";
import { itemsFetchData } from "./actions/fetchData";
import LeaderBoard from "./main-menu-components/LeaderBoard";

class App extends Component {
  componentDidMount() {
    this.props.fetchData("");
  }

  render() {
    let userName = getUserName(this.props);

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
                    Leader Board
                  </Nav.Link>
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div>
          <Switch>
            <Route exact path="/addquestion" component={AddQuestion} />
            <Route exact path="/leaderboard" component={LeaderBoard} />
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(itemsFetchData(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
