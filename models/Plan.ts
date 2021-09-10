import * as Mongoose from "mongoose";
import { ResourceDocument } from "./Resource";

export interface PlanDocument extends Mongoose.Document {
  name: string
  resources: {
    resource: Mongoose.PopulatedDoc<ResourceDocument>
  }[]
}

const PlanSchema = new Mongoose.Schema({
  name: String,
  resources: [{
    _id: false,
    resource: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Resource'
    },
  }]
})


if (Mongoose.modelNames().includes('Plan')) {
  Mongoose.deleteModel('Plan')
}

export default Mongoose.model<PlanDocument>('Plan', PlanSchema)
