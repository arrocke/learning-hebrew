import * as Mongoose from "mongoose";
import ResourceType from "../types/ResourceType";

export interface ResourceDocument extends Mongoose.Document {
  name: string
  links: {
    resourceType: ResourceType,
    url: string
  }[]
}

const ResourceSchema = new Mongoose.Schema({
  name: String,
  links: [{
    _id: false,
    resourceType: String,
    url: String
  }]
})

if (Mongoose.modelNames().includes('Resource')) {
  Mongoose.deleteModel('Resource')
}
export default Mongoose.model<ResourceDocument>('Resource', ResourceSchema)
