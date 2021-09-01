import * as actionTypes from "../actionTypes";
import * as API from "../../axios/index";

export const fetchMemories = () => async (dispatch) => {
  try {
    const { data } = await API.fetchMemories();

    dispatch({
      type: actionTypes.FETCH_ALL_MEMORIES,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createMemory = (memory) => async (dispatch) => {
  try {
    const { data } = await API.createMemory(memory);

    dispatch({
      type: actionTypes.CREATE_MEMORY,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteMemory = (id) => async (dispatch) => {
  try {
    await API.deleteMemory(id);
    dispatch({
      type: actionTypes.DELETE_MEMORY,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateMemory = (id, updatedMemory) => async (dispatch) => {
  try {
    const { data } = await API.updateMemory(id, updatedMemory);

    dispatch({
      type: actionTypes.UPDATE_MEMORY,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
