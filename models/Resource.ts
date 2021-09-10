import * as Mongoose from "mongoose";
import ResourceType from "../types/ResourceType";

export interface ResourceDocument extends Mongoose.Document {
  name: string
  url: string
  resourceType: ResourceType
}

const ResourceSchema = new Mongoose.Schema({
  name: String,
  url: String,
  resourceType: String 
})

if (Mongoose.modelNames().includes('Resource')) {
  Mongoose.deleteModel('Resource')
}
export default Mongoose.model<ResourceDocument>('Resource', ResourceSchema)
