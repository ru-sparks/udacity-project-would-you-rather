import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { setRedirectedPath } from './../actions/redirect';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  console.log('rest', rest);
  return (
    <Route {...rest} render={
      props =>{ 
        if (rest.authorizedUser) {
          return<Component {...rest} {...props} /> 
        } else {
          alert("Please login before using this feature.");
          rest.setRedirectedPath(rest.path);
          return <Redirect to={
            {
              pathname: '/login',
              state: {
                from: props.location
              }
            }
          } />
        }
      }
    } />
  )
}

const mapStateToProps = (state) => {
    return {
      authorizedUser: state.authorizedUser,
    };
  };

  
export default connect(mapStateToProps, { setRedirectedPath })(ProtectedRoute);
