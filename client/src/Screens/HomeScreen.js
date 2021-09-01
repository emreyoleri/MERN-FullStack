import React, { useEffect } from "react";
import { Spinner, Col, Row } from "react-bootstrap";
import Memory from "../Components/Memory";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { memoryActions } from "../redux/actions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { memories } = useSelector((state) => state.memory);

  const { fetchMemories } = bindActionCreators(memoryActions, dispatch);
  useEffect(() => {
    const getFetchMemories = async () => {
      await fetchMemories();
    };

    getFetchMemories();
  }, []);
  return (
    <>
      <h1>Last Memories</h1>
      {memories.length ? (
        <Row>
          {memories.map((memory) => (
            <Col
              sm={12}
              md={6}
              lg={4}
              xl={3}
              key={memory._id}
              className="m-auto"
            >
              <Memory memory={memory} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center mt-3">
          <Spinner animation="border" />
        </div>
      )}
    </>
  );
};

export default HomeScreen;
