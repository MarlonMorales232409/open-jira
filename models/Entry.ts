import { Model, Schema } from "mongoose";
import mongoose from "mongoose";
import { Entry } from "../interfaces/entry";

interface IEntry extends Entry {}

const entrySchema = new Schema({
	description: { type: String, require: true },
	createdAt: { type: Number },
	status: {
		type: String,
		enum: {
			values: ["pending", "in-progress", "finished"],
			message: "{VALUE} is not an allowed status",
		},
	},
});

const EntryModel: Model<IEntry> =
	mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default EntryModel;
