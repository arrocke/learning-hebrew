import * as Mongoose from "mongoose";

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

export default Mongoose.models.LearningPlan ?? Mongoose.model('LearningPlan', LearningPlanSchema)
