import React, { Component } from "react";
import { connect } from "react-redux";
import "../App.css";
import { Form, Button } from "react-bootstrap";
import { saveQuestionAnswer } from "../api/saveQuestonAnswer";

class QuestionAsk extends Component {
  state = {
    selected: "0",
    disableSubmit: false,
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
    this.setState((state) => {
      return { ...state, disableSubmit: true };
    });
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
      let heading = "Would you rather?";
      let pleaseWait = <h6>Choose wisely grasshopper</h6>;
      if (this.state.disableSubmit) {
        pleaseWait = <h6>Please wait while complex results are tallied...</h6>;
      }

      return (
        <div className="App">
          <header className="App-header">
            <h3>{heading}</h3>
            <Form onSubmit={this.formSubmit}>
              <Form.Check
                type="radio"
                value="1"
                checked={this.state.selected === "1"}
                onChange={this.onValueChange}
                label={question.optionOne.text}
                disabled={this.state.disableSubmit}
              />
              <Form.Check
                type="radio"
                value="2"
                checked={this.state.selected === "2"}
                onChange={this.onValueChange}
                label={question.optionTwo.text}
                disabled={this.state.disableSubmit}
              />

              <Button
                variant="outline-secondary"
                type="submit"
                disabled={this.state.disableSubmit}
              >
                Submit
              </Button>
              {pleaseWait}
            </Form>
          </header>
        </div>
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
