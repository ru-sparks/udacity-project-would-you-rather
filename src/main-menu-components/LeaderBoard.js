import React from "react";
import { Card, CardDeck, CardGroup, ListGroup, ListGroupItem } from "react-bootstrap";
import { connect } from "react-redux";
import "./App.css";
import cloneDeep from "lodash/cloneDeep";
import { getUserName } from './../App';

const getCount = (element) => {
  return (
    (element[1].answers ? Object.entries(element[1].answers).length : 0) +
    (element[1].questions ? element[1].questions.length : 0)
  );
};
const LeaderBoard = (props) => {
  //   let page = Array(8)
  //     .fill(0)
  //     .map((_, i) => {
  //       return (
  //         <Card style={{ width: "18rem" }}>
  //           <Card.Img
  //             variant="top"
  //             src="https://images.unsplash.com/photo-1546249041-2316761d7c1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=802&q=80"
  //             alt="user"
  //           />
  //           <Card.Body>
  //             <Card.Title>Card Title</Card.Title>
  //             <Card.Text>
  //               Some quick example text to build on the card title and make up the
  //               bulk of the card's content.
  //             </Card.Text>
  //           </Card.Body>
  //           <ListGroup className="list-group-flush">
  //             <ListGroupItem>Cras justo odio</ListGroupItem>
  //             <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
  //             <ListGroupItem>Vestibulum at eros</ListGroupItem>
  //           </ListGroup>
  //           <Card.Body>
  //             <Card.Link href="#">Card Link</Card.Link>
  //             <Card.Link href="#">Another Link</Card.Link>
  //           </Card.Body>
  //         </Card>
  //       );
  //     });

  let page = <></>;

  if (props.items.users) {
    let users = cloneDeep(props.items.users);
    let userArray = Object.entries(users);
    userArray.sort((e1, e2) => {
      let count1 = getCount(e1);
      let count2 = getCount(e2);

      return -(count1 < count2 ? -1 : count1 > count2 ? 1 : 0);
    });

    page = userArray.map((element, index) => {
      let answers = element[1].answers
        ? Object.entries(element[1].answers).length
        : 0;
      let asked = element[1].questions.length;
      let userName = getUserName(props);
      return (
        <Card
          key={element[1].id}
          className="card-img-top"
        >
          <Card.Img
            variant="top"
            src={element[1].avatarURL}
            alt="user"
          />
          <Card.Body>
            <Card.Title>{element[1].name}</Card.Title>
            <Card.Text>
              <ul>
                <li>Answered: {answers}</li>
                <li>Asked: {asked}</li>
                {element[1].name === userName ? <li>Current User</li> : <></>}
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
      );
    });
  }

  return <CardGroup>{page}</CardGroup>;
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
    authorizedUser: state.authorizedUser,
  };
};

export default connect(mapStateToProps)(LeaderBoard);
