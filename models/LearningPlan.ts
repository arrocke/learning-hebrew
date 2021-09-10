import * as Mongoose from "mongoose";

export interface LearningPlanDocument extends Mongoose.Document {
  resources: {
    resource: Mongoose.Types.ObjectId,
    status: string
  }[]
}

const LearningPlanSchema = new Mongoose.Schema({
  resources: [{
    _id: false,
    resource: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Resource'
    },
    status: String
  }]
})

export default Mongoose.modelNames().includes('LearningPlan')
  ? Mongoose.model<LearningPlanDocument>('LearningPlan')
  : Mongoose.model<LearningPlanDocument>('LearningPlan', LearningPlanSchema)
