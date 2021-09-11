import * as Mongoose from "mongoose";
import ResourceType from "../types/ResourceType";
import { ResourceDocument } from "./Resource";

export interface PlanDocument extends Mongoose.Document {
  name: string
  resources: {
    resource: Mongoose.PopulatedDoc<ResourceDocument, Mongoose.Types.ObjectId>,
    resourceType: ResourceType
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
    resourceType: String
  }]
})


if (Mongoose.modelNames().includes('Plan')) {
  Mongoose.deleteModel('Plan')
}

export default Mongoose.model<PlanDocument>('Plan', PlanSchema)
