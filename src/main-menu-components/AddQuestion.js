import "./App.css";
import Form from "react-bootstrap/Form";

function AddQuestion() {
  return (
    <div className="App">
      <header className="App-header">
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Add Question</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
        </Form>
      </header>
    </div>
  );
}

export default AddQuestion;
