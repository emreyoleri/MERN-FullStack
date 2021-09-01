import React from "react";
import { Container } from "react-bootstrap";
import UpdateMemory from "../Components/UpdateMemory";
import { useParams } from "react-router-dom";

const UpdateScreen = () => {
  const { id } = useParams();
  return (
    <>
      <Container>
        <UpdateMemory id={id} />
      </Container>
    </>
  );
};

export default UpdateScreen;
