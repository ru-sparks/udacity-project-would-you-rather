import React, { Component } from "react";
import { connect } from "react-redux";
import "../App.css";
import {
  Form,
  Button,
} from "react-bootstrap";
import { saveQuestionAnswer } from "../actions/saveQuestonAnswer";

class QuestionAsk extends Component {
  state = {
    selected: "0",
  };
  formSubmit = (event) => {
    let { questionId } = this.props.match.params;
    let authorizedUser  = this.props.authorizedUser;
    let answer = this.state.selected === "1" ? "optionOne" : "optionTwo";
    this.props.saveQuestionAnswer(authorizedUser, questionId, answer, this.props.history);
    event.preventDefault();
  };
  onValueChange = (event) => {
    this.setState({
      selected: event.target.value,
    });
  };
  render() {
    let { questionId } = this.props.match.params;

    let question = this.props.items.questions[questionId];

    if (question) {
      return (
        <>
          <h3>Would you Rather?</h3>
          <Form onSubmit={this.formSubmit}>
            <Form.Check
              type="radio"
              value="1"
              checked={this.state.selected === "1"}
              onChange={this.onValueChange}
              label={question.optionOne.text}
            />
            <Form.Check
              type="radio"
              value="2"
              checked={this.state.selected === "2"}
              onChange={this.onValueChange}
              label={question.optionTwo.text}
            />
            <Button variant="outline-secondary" type="submit">
              Submit
            </Button>
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
