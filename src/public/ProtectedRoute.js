import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { setRedirectedPath } from "./../actions/redirect";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (rest.authorizedUser) {
          return <Component {...rest} {...props} />;
        } else {
          alert("Please login before using this feature.");

          // React warns on modifing state directly from a render method
          setTimeout(() => {
            return rest.setRedirectedPath(rest.path);
          }, 5);

          let path = `/`;
          return (
            <Redirect
              to={{
                pathname: path,
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    authorizedUser: state.authorizedUser,
  };
};

export default connect(mapStateToProps, { setRedirectedPath })(ProtectedRoute);
