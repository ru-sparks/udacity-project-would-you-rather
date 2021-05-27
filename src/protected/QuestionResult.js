import React, { Component } from "react";
import { connect } from "react-redux";
import "../App.css";
import { Form } from "react-bootstrap";
import { saveQuestionAnswer } from "../actions/saveQuestonAnswer";

class QuestionAsk extends Component {
  state = {
    selected: "0",
  };
  formSubmit = (event) => {
    let { questionId } = this.props.match.params;
    let authorizedUser = this.props.authorizedUser;
    let answer = this.state.selected === "1" ? "optionOne" : "optionTwo";
    this.props.saveQuestionAnswer(
      authorizedUser,
      questionId,
      answer,
      this.props.history
    );
    event.preventDefault();
  };
  onValueChange = (event) => {
    this.setState({
      selected: event.target.value,
    });
  };
  render() {
    debugger;
    let { questionId } = this.props.match.params;
    let question = this.props.items.questions[questionId];
    let alreadyAnswered;
    if (question) {
      let heading = "Your answer.";
      let result = this.props.items.questions[questionId].optionOne.votes.find(
        (e) => {
          return e === this.props.authorizedUser;
        }
      );
      if (result) {
        alreadyAnswered = "1";
      } else {
        alreadyAnswered = "2";
      }
      return (
        <>
          <h3>{heading}</h3>
          <Form onSubmit={this.formSubmit}>
            <Form.Check
              type="radio"
              value="1"
              checked={alreadyAnswered === "1"}
              label={question.optionOne.text}
              disabled={true}
            />
            <Form.Check
              type="radio"
              value="2"
              checked={alreadyAnswered === "2"}
              label={question.optionTwo.text}
              disabled={true}
            />
          </Form>
        </>
      );
    } else {
      return <div>404 Not Found</div>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveQuestionAnswer: (authedUser, qid, answer, history) => {
      dispatch(saveQuestionAnswer(authedUser, qid, answer, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionAsk);
