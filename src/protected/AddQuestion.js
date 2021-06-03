import React, { Component } from "react";
import "../App.css";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { saveNewQuestion } from './../api/saveNewQueston';
import { connect } from 'react-redux';

class AddQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    disabledSubmit: false,
  };

  formSubmit = (event) => {
    this.props.saveNewQuestion(this.state.optionOne, this.state.optionTwo, this.props.authorizedUser, this.props.history);
    this.setState((state) => {
      return { ...state, disabledSubmit: true };
    });
    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    let prompt = this.state.disabledSubmit ? "Please wait while your question is recorded..." : "Enter an interesting 'would you rather'";

    return (
      <div className="App">
        <header className="App-header">
          {prompt}
          <Form onSubmit={this.formSubmit}>
            <Form.Group controlId="formGridAddress1">
              <Form.Label>Choice One</Form.Label>
              <Form.Control name="optionOne" onChange={this.onChange} disabled={this.state.disabledSubmit}/>
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
              <Form.Label>Choice Two</Form.Label>
              <Form.Control name="optionTwo" onChange={this.onChange} disabled={this.state.disabledSubmit}/>
            </Form.Group>

            <Button
              variant="outline-dark"
              type="submit"
              disabled={
                this.state.optionOne.length === 0 ||
                this.state.optionTwo.length === 0 ||
                this.state.disabledSubmit
              }
            >
              Submit
            </Button>
          </Form>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveNewQuestion: (optionOneText, optionTwoText, author, history) => {
      dispatch(saveNewQuestion(optionOneText, optionTwoText, author, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);
