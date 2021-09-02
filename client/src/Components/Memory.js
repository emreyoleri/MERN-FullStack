import React, { useEffect, useState } from "react";
import moment from "moment";
import { LinkContainer } from "react-router-bootstrap";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { BsFillStarFill } from "react-icons/bs";
import { useDispatch, useSelect, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { memoryActions } from "../redux/actions/index";
import { bindActionCreators } from "redux";

const Memory = ({ memory }) => {
  const [user, setUser] = useState(null);

  const userState = useSelector((state) => state.user);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, [userState]);
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
        {user?.user?._id === memory.creatorId ? (
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
        ) : (
          <Card.Footer className="pb-0 d-flex justify-content-center bg-white">
            <BsFillStarFill
              size={25}
              style={{ color: "#eeee00", cursor: "pointer" }}
            />
          </Card.Footer>
        )}
      </Card>
    </>
  );
};

export default Memory;
