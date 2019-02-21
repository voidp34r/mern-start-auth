// Import Actions
import { ADD_SENSOR } from './SensorActions';

// Initial State
const initialState = {};

const SensorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SENSOR:
      return state;
    default:
      return state;
  }
};

export default SensorReducer;
