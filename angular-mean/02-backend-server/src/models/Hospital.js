import { model, Schema } from 'mongoose'

const HospitalSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  img: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { collection: 'hospitals' })

HospitalSchema.method('toJSON', function () {
  const { __v, _id, ...Object } = this.toObject()
  Object.uuid = _id
  return Object
})

export const Hospital = model('Hospital', HospitalSchema)
