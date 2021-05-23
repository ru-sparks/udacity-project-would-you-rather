import React, { Component } from "react";
import { Button, Card, CardGroup } from "react-bootstrap";
import { connect } from "react-redux";
import "./UserQuestionList.css";
import cloneDeep from "lodash/cloneDeep";
import { getUserName } from "../public/App";

const getCount = (element) => {
  return (
    (element[1].answers ? Object.entries(element[1].answers).length : 0) +
    (element[1].questions ? element[1].questions.length : 0)
  );
};

const handleQuestion = (history, questionId, answered) => {
  if (answered) {
    history.push(`/questionresult/${questionId}`);
  } else {
    history.push(`/questionask/${questionId}`);
  }
};

class UserQuestionList extends Component {
  render() {
    let page = <></>;
    if (this.props.items.users) {
      let currentUser = this.props.items.users[this.props.authorizedUser];
      let userAnswers = currentUser.answers;
      let userAnswersArray = Object.entries(userAnswers);

      let questions = [];
      if (this.props.answered) {
        questions = userAnswersArray.map((answer) => {
          return this.props.items.questions[answer[0]];
        });
      } else {
        let allQuestions = Object.entries(this.props.items.questions);

        for (let i = 0; i < allQuestions.length; i++) {
          if (
            userAnswersArray.find((ua) => {
              return ua[0] === allQuestions[i][0];
            }) === undefined
          ) {
            questions.push(this.props.items.questions[allQuestions[i][0]]);
          }
        }
      }
      let users = cloneDeep(this.props.items.users);
      let userArray = Object.entries(users);
      userArray.sort((e1, e2) => {
        let count1 = getCount(e1);
        let count2 = getCount(e2);

        return -(count1 < count2 ? -1 : count1 > count2 ? 1 : 0);
      });

      page = questions.map((element, index) => {
        let questionAuthor = this.props.items.users[element.author];
        return (
          <Card style={{ width: "180rem" }} key={index}>
            <Card.Img variant="top" src={questionAuthor.avatarURL} alt="user" />
            <Card.Body>
              <Card.Title>{questionAuthor.name + " Asks"}</Card.Title>
              <Card.Text className="truncate">
                {element.optionOne.text}
              </Card.Text>
              <Card.Text className="truncate">or</Card.Text>
              <Card.Text className="truncate">
                {element.optionTwo.text}
              </Card.Text>
              <Card.Text>
                <Button
                  variant="outline-secondary"
                  onClick={() =>
                    handleQuestion(this.props.history, element.id, this.props.answered)
                  }
                  size="sm"
                >
                  Poll
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        );
      });
    }
    return <CardGroup>{page}</CardGroup>;
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    authorizedUser: state.authorizedUser,
  };
};

export default connect(mapStateToProps)(UserQuestionList);
