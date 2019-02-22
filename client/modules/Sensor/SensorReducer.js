// Import Actions
import { ADD_SENSOR } from './SensorActions';

// Initial State
const initialState = {};

const SensorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SENSOR:
      return {
        data: action.sensor,
      };
    default:
      return state;
  }
};

export default SensorReducer;
