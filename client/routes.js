/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./modules/Empresa/Empresa');
  require('./modules/Empresa/EmpresaHome');
  require('./modules/Empresa/EmpresaError');
  require('./modules/App/components/Auth/SingIn');
  require('./modules/App/components/Auth/Register');
  require('./modules/Empresa/pages/EmpresaDetails');
  require('./modules/Empresa/pages/EmpresaAdd');
  require('./modules/Empresa/pages/EmpresaEdit');
  // require('./modules/Empresa/pages/SensorData');
  require('./modules/Sensor/pages/SensorList');
  require('./modules/Sensor/pages/SensorDetail');
  require('./modules/Sensor/pages/SensorDataList');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Empresa/EmpresaHome').default);
        });
      }}
    />
    <Route
      path="/login"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/App/components/Auth/SingIn').default);
        });
      }}
    />
    <Route
      path="/register"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/App/components/Auth/Register').default);
        });
      }}
    />
    <Route
      path="/home"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Empresa/EmpresaHome').default);
        });
      }}
    />
    <Route
      path="/empresa"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Empresa/Empresa').default);
        });
      }}
    />
    <Route
      path="/empresa/add"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Empresa/pages/EmpresaAdd').default);
        });
      }}
    />
    {/* <Route
      path="/empresa/*"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Empresa/EmpresaError').default);
        });
      }}
    /> */}
    <Route
      path="/empresa/:cuid"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Empresa/pages/EmpresaDetails').default);
        });
      }}
    />
    <Route
      path="/empresa/:cuid/edit"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Empresa/pages/EmpresaEdit').default);
        });
      }}
    />
    <Route
      path="/empresa/:cuid/sensor"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Sensor/pages/SensorList').default);
        });
      }}
    />
    <Route
      path="/empresa/:cuid/sensor/:sensorUid"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Sensor/pages/SensorDetail').default);
        });
      }}
    />
    <Route
      path="/empresa/:cuid/sensor/:sensorUid/data"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Sensor/pages/SensorDataList').default);
        });
      }}
    />
  </Route>
);
