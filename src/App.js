import logo from "./logo.svg";
import "./App.css";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <>
          <Navbar bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="#home">Would you rather?</Navbar.Brand>
            <Nav className="mr-auto">

              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-info">Search</Button>
            </Form>
          </Navbar>
        </>
      </header>
    </div>
  );
}

export default App;
