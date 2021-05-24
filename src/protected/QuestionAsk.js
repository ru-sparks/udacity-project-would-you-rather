import React, { Component } from "react";
import { connect } from "react-redux";
import "../App.css";
import {
  Form,
  Button,
} from "react-bootstrap";

class QuestionAsk extends Component {
  state = {
    selected: "0",
  };
  formSubmit = (event) => {
    alert(this.state.selected);
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
              label={question.optionOne.text}
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
export default connect(mapStateToProps)(QuestionAsk);
