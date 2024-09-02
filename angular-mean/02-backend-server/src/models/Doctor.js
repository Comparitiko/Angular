import { model, Schema } from 'mongoose'

const DoctorSchema = new Schema({
  dni: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  hospital: {
    type: Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { collection: 'doctors' })

DoctorSchema.method('toJSON', function () {
  const { __v, _id, ...Object } = this.toObject()
  Object.uuid = _id
  return Object
})

export const Doctor = model('Doctor', DoctorSchema)
