import React, { Component } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Button, NavItem } from "react-bootstrap";
import { Link, Route, Switch } from "react-router-dom";
import Login from "../login/Login";
import AddQuestion from "../protected/AddQuestion";
import { connect } from "react-redux";
import { itemsFetchData } from "../api/fetchData";
import LeaderBoard from "../protected/LeaderBoard";
import ProtectedRoute from "./ProtectedRoute";
import { authorizeUser } from "./../actions/auth";
import PollResults from "../protected/PollResults";
import QuestionResult from "./../protected/QuestionResult";
import QuestionAsk from "../protected/QuestionAsk";

class App extends Component {
  componentDidMount() {
    this.props.fetchData("");
  }

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    let userName = getUserName(this.props);

    return (
      <div>
        <div>
          <Navbar
            className="my-0"
            bg="dark"
            variant="dark"
            expand="lg"
            transition="false"
          >
            <Navbar.Brand as={Link} to="/">
              Would you rather?
            </Navbar.Brand>
            {/* <Navbar.Toggle aria-controls="navbarScroll" transition="false" /> */}
            {/* <Navbar.Collapse id="navbarScroll"> */}
            <Nav className="justify-content-end my-2 my-lg-0">
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

              {userName ? (
                <>
                  <Navbar.Text className="">
                    Signed in as: {userName}
                  </Navbar.Text>
                  <Button variant="outline-primary" onClick={this.handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <></>
              )}
            </Nav>
            {/* </Navbar.Collapse> */}
          </Navbar>{" "}
        </div>
        <div>
          <Switch>
            <ProtectedRoute exact path="/addquestion" component={AddQuestion} />
            <ProtectedRoute exact path="/leaderboard" component={LeaderBoard} />
            <ProtectedRoute
              exact
              path="/questionresult/:questionId"
              component={QuestionResult}
            />
            <ProtectedRoute
              exact
              path="/questionask/:questionId"
              component={QuestionAsk}
            />

            {userName ? (
              <Route exact path="/" component={PollResults} />
            ) : (
              <Route
                exact
                path="/"
                render={(props) => (
                  <Login {...props} validRedirectPaths={["/addquestion", "/leaderboard"]} />
                )}
              />
            )}

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
    logout: () => dispatch(authorizeUser("")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
