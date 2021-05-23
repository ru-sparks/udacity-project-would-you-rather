import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import UserQuestionList from "./UserQuestionList";

class PollResults extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="profile" title="Unanswered Questions">
          <UserQuestionList answered={false}  history={this.props.history}></UserQuestionList>
        </Tab>
        <Tab eventKey="contact" title="Answered Questions">
          <UserQuestionList answered={true} history={this.props.history}></UserQuestionList>
        </Tab>
      </Tabs>
    );
  }
}

export default PollResults;
