import React from "react";
import moment from "moment";
import { LinkContainer } from "react-router-bootstrap";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import { memoryActions } from "../redux/actions/index";
import { bindActionCreators } from "redux";

const Memory = ({ memory }) => {
  const dispatch = useDispatch();
  const { deleteMemory } = bindActionCreators(memoryActions, dispatch);
  return (
    <>
      <Card className="rounded p-3 my-3">
        <Card.Img variant="top" src={memory.image} className="rounded" />
        <Card.Body>
          <Card.Title style={{ color: "darkblue" }}>{memory.title}</Card.Title>
          <Card.Text>{memory.content}</Card.Text>
          <Card.Title className="mb-3">Author: {memory.creator}</Card.Title>
          <Card.Subtitle>{moment(memory.createdAt).fromNow()}</Card.Subtitle>
        </Card.Body>
        <Card.Footer className="pb-0 d-flex justify-content-between bg-white">
          <LinkContainer
            style={{ cursor: "pointer" }}
            to={`/update/${memory._id}`}
            size={25}
          >
            <MdModeEdit color="blue" />
          </LinkContainer>
          <MdDelete
            size={25}
            color="red"
            style={{ cursor: "pointer" }}
            onClick={() => deleteMemory(memory._id)}
          />
        </Card.Footer>
      </Card>
    </>
  );
};

export default Memory;
