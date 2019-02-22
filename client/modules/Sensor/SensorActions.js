import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_SENSOR = 'ADD_SENSOR';

// Export Actions
export function addSensor(sensor) {
  return {
    type: ADD_SENSOR,
    sensor,
  };
}
export function addSensorRequest(sensor, empresaUid) {
  return (dispatch) => {
    return callApi(`empresas/${empresaUid}/add`, 'POST', {
      id: sensor.id,
      datime: sensor.datime,
      data: [sensor.data],
    }).then(res => dispatch(addSensor(res)));
  };
}
