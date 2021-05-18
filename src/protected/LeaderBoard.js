import React from "react";
import {
  Card,
  CardGroup,
} from "react-bootstrap";
import { connect } from "react-redux";
import "../App.css";
import cloneDeep from "lodash/cloneDeep";
import { getUserName } from "../public/App";

const getCount = (element) => {
  return (
    (element[1].answers ? Object.entries(element[1].answers).length : 0) +
    (element[1].questions ? element[1].questions.length : 0)
  );
};
const LeaderBoard = (props) => {
  let page = <></>;

  if (props.items.users) {
    let users = cloneDeep(props.items.users);
    let userArray = Object.entries(users);
    userArray.sort((e1, e2) => {
      let count1 = getCount(e1);
      let count2 = getCount(e2);

      return -(count1 < count2 ? -1 : count1 > count2 ? 1 : 0);
    });

    page = userArray.map((element, index) => {
      let answers = element[1].answers
        ? Object.entries(element[1].answers).length
        : 0;
      let asked = element[1].questions.length;
      let userName = getUserName(props);
      return (
        <Card style={{ width: "180rem" }} key={element[1].id}>
          <Card.Img variant="top" src={element[1].avatarURL} alt="user" />
          <Card.Body>
            <Card.Title>{element[1].name}</Card.Title>
            <Card.Text
              style={{
                textIndent: 50,
                marginBottom: 0,
              }}
            >
              Answered: {answers}
            </Card.Text>
            <Card.Text
              style={{
                textIndent: 50,
                marginBottom: 0,
              }}
            >
              Asked: {asked}
            </Card.Text>
            <Card.Text
              style={{
                textIndent: 50,
                marginBottom: 0,
              }}
            >
              Score: {answers+asked}
            </Card.Text>
            {element[1].name === userName ? (
              <Card.Text
                style={{
                  textIndent: 50,
                  marginBottom: 0,
                }}
              >
                Current User
              </Card.Text>
            ) : (
              <></>
            )}
          </Card.Body>
        </Card>
      );
    });
  }

  return <CardGroup>{page}</CardGroup>;
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
    authorizedUser: state.authorizedUser,
  };
};

export default connect(mapStateToProps)(LeaderBoard);
