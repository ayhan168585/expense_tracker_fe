import { Record, RecordDispatch, RecordForm } from "../../types/record";
import api from "../../utils/api";

export const getRecords = () => async (dispatch: RecordDispatch) => {
  dispatch({ type: "GET_RECORDS_START" });
  try {
    const response = await api.get<Record[]>("/records");
    response.data.sort((a, b) => b.id - a.id);
    dispatch({ type: "GET_RECORDS_SUCCESS", payload: response.data });
  } catch {
    dispatch({ type: "GET_RECORDS_ERROR" });
  }
};

export const addRecord =
  (form: RecordForm) => async (dispatch: RecordDispatch) => {
    dispatch({ type: "ADD_RECORD_START" });
    try {
      const response = await api.post<Record>("/records", form);
      dispatch({ type: "ADD_RECORD_SUCCESS", payload: response.data });
    } catch {
      dispatch({ type: "ADD_RECORD_ERROR" });
    }
  };
