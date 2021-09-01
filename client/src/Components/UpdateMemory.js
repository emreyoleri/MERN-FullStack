import React, { useState, useEffect } from "react";
import ReactFileBase64 from "react-file-base64";
import { Form, Button, Alert } from "react-bootstrap";
import { fetchMemory } from "../axios/index";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { memoryActions } from "../redux/actions/index";
import { bindActionCreators } from "redux";

const UpdateMemory = ({ id }) => {
  const [memoryData, setMemoryData] = useState({
    title: "",
    creator: "",
    content: "",
    image: "",
  });

  const dispatch = useDispatch();

  const { updateMemory } = bindActionCreators(memoryActions, dispatch);

  useEffect(() => {
    const getMemory = async () => {
      const { data } = await fetchMemory(id);
      setMemoryData(data);
    };

    getMemory();
  }, [id]);

  const history = useHistory();
  return (
    <>
      <Form
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          updateMemory(id, memoryData);
          history.push("/");
        }}
      >
        <Form.Group className="mt-3">
          <h1>Update a Memory</h1>
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
            If you do not change this field, the last image you assigned will be
            set as the default value.
          </Alert>
        </Form.Group>

        <div className="d-grid gap-2 mt-3">
          <Button variant="primary" type="submit" style={{ height: "50px" }}>
            Update and Share
          </Button>
        </div>
      </Form>
    </>
  );
};

export default UpdateMemory;
