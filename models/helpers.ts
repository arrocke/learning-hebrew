import * as Mongoose from 'mongoose'

export type Populated<
	Document extends Mongoose.Document,
	Key extends keyof Document,
	PopulatedType extends object
> = Omit<Document, Key> & { [key in Key]: PopulatedType }