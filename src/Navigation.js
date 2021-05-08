import React, { Component } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavItem } from "react-bootstrap";
import { Link, Route, Switch } from "react-router-dom";
import Login from "./Login";
import AddQuestion from './AddQuestion';
import { connect } from "react-redux";
import { itemsFetchData } from './actions/fetchData';
import { authorizedUser } from './reducers/auth';

class Navigation extends Component {
  
  componentDidMount() {
    this.props.fetchData(''); 
  }
  
  render() {
    if (this.props.items && this.props.items.questions && this.props.items.users) {
      ;
    }
    return (
      <div>
        <div>
          <Navbar>
            <Navbar.Brand as={Link} to="/">
              {this.props.authorizedUser ? "Welcome: " + this.props.items.users[this.props.authorizedUser].name : ""}
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
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div>
          <Switch>
            <Route exact path="/addquestion" component={AddQuestion} />
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
      fetchData: (url) => dispatch(itemsFetchData(url))
  };
};
 
 
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

