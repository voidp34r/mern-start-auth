const express = require('express');
const router = express.Router();

const cors = require('cors');
const bodyParser = require('body-parser');
//
const request = require('request');
//
// const querystring = require('querystring');
// const http = require('http');

router.get('/', (req, res) => {
  res.send('hello');
});

require('dotenv').config();

let app = express();
const PORT = 8081 || 8081;


app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.get('/', router);


app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

console.log('INICIANDO SENSOR...');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNlbnNvciIsIl9pZCI6IjVjNjA1ZGNiZjc0MTk0MDRjY2ZiZjYzOSIsImlhdCI6MTU0OTgyODA1N30.siwlUJSdPz8_R_KDDLYBD2Ip0276FLpI1RpF7cIutCY';

const auth = {
  username: 'sensor',
  password: 'senhasecreta',
};

const clientHost = 'localhost';
const clientPort = '8080';
const getTokenContext = 'user/admin';
const registerContext = 'sensor';

const EmpresaDummy = {
  _id: '5c6f266e6d053e317cc0baed',
  id: 'empresa001',
  name: 'Matrix Nome da Empresa 01',
  sensorData: [],
};

const SensorDummy = {
  _id: '5c6f4c62df663e61e477983a',
  id: 'Sensor001',
  datatime: '2019-02-21T22:26:55.151Z',
  data: [],
};

const SenorDataDummy = {
  id: 'data01',
  temp: [11],
  datatime: '2019-02-09T00:00:01.488Z',
};

async function getTokenClient(postData) {
  const clientServerOptions = {
    uri: 'http://' + clientHost + ':' + clientPort + '/' + getTokenContext,
    body: JSON.stringify(postData),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  await request(clientServerOptions, (error, response) => {
    console.log(error, response.body);
    token = JSON.parse(response.body);
    console.log(token.data.tokenID);
    return response.body;
  });
}

async function getDataClient() {
  const clientServerOptions = {
    uri: `http://${clientHost}:${clientPort}/${'sensor'}`,
    // body: JSON.stringify(postData),
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  const result = await request(clientServerOptions, (error, response) => {
    console.log(error, response.body);
    return response.body;
  });
  return result;
}

async function registerClient(postData, sensor) {
  const clientServerOptions = {
    uri: `http://localhost:8000/api/empresas/${'5c6f266e6d053e317cc0baed'}/sensor/${'sensor 001'}/data`,
    body: JSON.stringify(postData),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`,
    },
  };
  await request(clientServerOptions, (error, response) => {
    console.log(error, response.body);
    return;
  });
}

async function registerEmpresa(postData) {
  const clientServerOptions = {
    uri: `http://localhost:8000/api/empresas/`,
    body: JSON.stringify(postData),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`,
    },
  };
  await request(clientServerOptions, (error, response) => {
    console.log(error, response.body);
    return;
  });
}

async function registerSensor(postData, empresaUid) {
  const clientServerOptions = {
    uri: `http://localhost:8000/api/empresas/${empresaUid}/add`,
    body: JSON.stringify(postData),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`,
    },
  };
  await request(clientServerOptions, (error, response) => {
    console.log(error, response.body);
    return;
  });
}

async function registerSensorData(postData, empresaUid, sensorId) {
  const clientServerOptions = {
    uri: `http://localhost:8000/api/empresas/${empresaUid}/sensor/${sensorId}/data`,
    body: JSON.stringify(postData),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`,
    },
  };
  await request(clientServerOptions, (error, response) => {
    console.log(error, response.body);
    return;
  });
}

// getTokenClient(auth);

function submitData() {
  // const min = 1;
  // const max = 100;

  // const lista = [];
  const sensorData = [];
  // const peso = [0.05, 0.15, 0.30, 0.50];

  const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  for (let i = 0; i < 10; i++) {
    let time = new Date();
    if (!i === 1) {
      time = new Date();
    }
    sensorData.push({
      id: `datai${i}`,
      datatime: time.setSeconds(time.getSeconds() + 1000),
      temp: rand(0, 100),
    });
    console.log(sensorData[i]);
  }

  let i = 0;
  const send = setInterval(() => {
    i++;
    const sendData = {
      id: `data${i}`,
      datatime: new Date(),
      temp: rand(0, 100),
    };
    // registerClient(sendData, 'void02');
    registerSensorData(sendData, EmpresaDummy._id, SensorDummy.id);
    console.log(`sendData: ${JSON.stringify(sendData)}`);
    if (i >= 10) {
      clearInterval(send);
    }
  }, 1000);
}

// var getData = getDataClient();

setTimeout(() => registerEmpresa(EmpresaDummy), 200);

setTimeout(() => registerSensor(SensorDummy, EmpresaDummy._id), 800);

setTimeout(() => submitData(), 1000);

