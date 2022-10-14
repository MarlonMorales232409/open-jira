import { IEntry } from "../models/Entry";
import { isValidObjectId } from "mongoose";
import { db } from ".";
import { Entry } from "../models";

export const getEntryById = async (id: string): Promise<IEntry | null> => {
	if (!isValidObjectId(id)) return null;

	db.connect();
	const entry = await Entry.findById(id).lean();
	db.disconnect();
	return JSON.parse(JSON.stringify(entry));
};
