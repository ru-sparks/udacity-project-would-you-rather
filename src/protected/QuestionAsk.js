import React from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';

const QuestionAsk = (props) => {
    const { questionId } = useParams();

    let question = props.items.questions[questionId];
    if (question) {
        return (
            <div>
                <h1>Question Ask</h1>
                <p>{question.optionOne.text}</p>
                <p>{question.optionTwo.text}</p>
            </div>
        );
    
    } else {
        return (<div>404 Not Found</div>);
    }
}

const mapStateToProps = (state) => {
    return {
      items: state.items,
    };
  };
export default connect(mapStateToProps)(QuestionAsk);
 