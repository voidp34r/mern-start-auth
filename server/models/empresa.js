import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DataSchema = new Schema({
  id: {
    type: 'String',
    default: new mongoose.Types.ObjectId(),
    required: true,
  },
  temp: {
    type: [Number],
    default: 0,
    required: true,
  },
  datatime: {
    type: Date,
  },
});


const SensorDataSchema = new mongoose.Schema({
  id: {
    type: String,
    default: new mongoose.Types.ObjectId(),
    required: true,
  },
  data: {
    type: [DataSchema],
    default: [],
    required: true,
  },
  datatime: {
    type: Date,
    required: true,
    default: new Date(),
  },
  created: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const empresaSchema = new Schema({
  id: {
    type: 'String',
    index: { unique: true },
    required: true,
  },
  name: { type: 'String', required: true },
  sensorData: {
    type: [SensorDataSchema],
    default: [],
    required: true,
  },

});

// eslint-disable-next-line consistent-return
empresaSchema.pre('save', function saveHook(next) {
  const empresa = this;

  if (!empresa.isModified('id') && !empresa.isModified('name')) {
    return next();
  }
});

export default mongoose.model('Empresa', empresaSchema);
