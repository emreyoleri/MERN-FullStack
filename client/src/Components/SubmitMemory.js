import React, { useState } from "react";
import ReactFileBase64 from "react-file-base64";
import { Form, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { memoryActions } from "../redux/actions/index";

const SubmitMemory = () => {
  const [memoryData, setMemoryData] = useState({
    title: "",
    creator: "",
    content: "",
    image: "",
  });

  const dispatch = useDispatch();
  const { createMemory } = bindActionCreators(memoryActions, dispatch);

  const history = useHistory();
  return (
    <>
      <Form
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          createMemory(memoryData);
          history.push("/");
        }}
      >
        <Form.Group className="mt-3">
          <h1>Create a Memory</h1>
        </Form.Group>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            type="text"
            value={memoryData.title}
            onChange={(e) =>
              setMemoryData({ ...memoryData, title: e.target.value })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Creator</Form.Label>
          <Form.Control
            name="creator"
            type="text"
            value={memoryData.creator}
            onChange={(e) =>
              setMemoryData({ ...memoryData, creator: e.target.value })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Your Memory</Form.Label>
          <Form.Control
            name="content"
            type="text"
            as="textarea"
            rows={3}
            value={memoryData.content}
            onChange={(e) =>
              setMemoryData({ ...memoryData, content: e.target.value })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mt-3">
          <ReactFileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setMemoryData({ ...memoryData, image: base64 })
            }
          />

          <Alert variant="dark" className="mt-3">
            Picture part is optional, if no picture is entered, it is set as
            blank
          </Alert>
        </Form.Group>

        <div className="d-grid gap-2 mt-3">
          <Button variant="primary" type="submit " style={{ height: "50px" }}>
            Share
          </Button>
        </div>
      </Form>
    </>
  );
};

export default SubmitMemory;
