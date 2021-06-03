import React, { Component } from "react";
import { connect } from "react-redux";
import "../App.css";
import { Form } from "react-bootstrap";

class QuestionResult extends Component {
  state = {
    selected: "0",
  };

  onValueChange = (event) => {
    this.setState({
      selected: event.target.value,
    });
  };
  
  render() {
    let { questionId } = this.props.match.params;
    let question = this.props.items.questions[questionId];
    let alreadyAnswered;
    if (question) {
      let heading = "Your answer selected.";

      alreadyAnswered = this.determineUserAnswer(questionId, alreadyAnswered);

      let optionOneCount = question.optionOne.votes.length;
      let optionTwoCount = question.optionTwo.votes.length;
      let totalCount = optionOneCount + optionTwoCount;
      let percentageOne = Math.round((optionOneCount * 100) / totalCount);
      let percentageTwo = Math.round((optionTwoCount * 100) / totalCount);

      let optionOneStats = ` (${optionOneCount} of ${totalCount} votes.  ${percentageOne} percent)`;
      let optionTwoStats = ` (${optionTwoCount} of ${totalCount} votes.  ${percentageTwo} percent)`;

      return (
        <div className="App">
          <header className="App-header">
            <h3>{heading}</h3>
            <Form>
              <Form.Check
                type="radio"
                value="1"
                checked={alreadyAnswered === "1"}
                label={question.optionOne.text + optionOneStats}
                disabled={true}
              />
              <Form.Check
                type="radio"
                value="2"
                checked={alreadyAnswered === "2"}
                label={question.optionTwo.text + optionTwoStats}
                disabled={true}
              />
            </Form>
          </header>
        </div>
      );
    } else {
      return <div>404 Not Found</div>;
    }
  }

  determineUserAnswer(questionId, alreadyAnswered) {
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
    return alreadyAnswered;
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};


export default connect(mapStateToProps)(QuestionResult);
