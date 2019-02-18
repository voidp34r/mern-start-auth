import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const empresaSchema = new Schema({
  name: { type: 'String', required: true },
});

export default mongoose.model('Empresa', empresaSchema);
